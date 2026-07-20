import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../common/services/prisma.service';
import { RedisService } from '../common/services/redis.service';
import { RegisterDto, LoginDto, PhoneLoginDto, VerifyOtpDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private redis: RedisService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const referralCode = this.generateReferralCode();

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
        name: dto.name,
        referralCode,
        referredBy: dto.referralCode,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
        referralCode: true,
      },
    });

    // Create wallet for user
    await this.prisma.wallet.create({
      data: { userId: user.id, balance: 0 },
    });

    // Handle referral bonus
    if (dto.referralCode) {
      await this.processReferralBonus(dto.referralCode, user.id);
    }

    const tokens = await this.generateTokens(user.id);
    return { user, ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user.id);
    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async phoneLogin(dto: PhoneLoginDto) {
    const otp = this.generateOTP();
    await this.redis.setex(`otp:${dto.phone}`, 300, otp);

    // Send OTP via Twilio/SMS provider
    // await this.smsService.sendOTP(dto.phone, otp);

    return { message: 'OTP sent successfully', expiresIn: 300 };
  }

  async verifyOTP(dto: VerifyOtpDto) {
    const storedOtp = await this.redis.get(`otp:${dto.phone}`);

    if (!storedOtp || storedOtp !== dto.otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    await this.redis.del(`otp:${dto.phone}`);

    let user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: `${dto.phone}@quickmart.local`,
          phone: dto.phone,
          phoneVerified: true,
          referralCode: this.generateReferralCode(),
        },
      });
      await this.prisma.wallet.create({
        data: { userId: user.id, balance: 0 },
      });
    } else {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { phoneVerified: true },
      });
    }

    const tokens = await this.generateTokens(user.id);
    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.status !== 'ACTIVE') {
        throw new UnauthorizedException();
      }

      return this.generateTokens(user.id);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async oauthLogin(profile: any, provider: string) {
    let user = await this.prisma.user.findFirst({
      where: {
        oauthAccounts: {
          some: {
            provider,
            providerAccountId: profile.id,
          },
        },
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          avatar: profile.picture,
          emailVerified: true,
          referralCode: this.generateReferralCode(),
          oauthAccounts: {
            create: {
              provider,
              providerAccountId: profile.id,
              accessToken: profile.accessToken,
              refreshToken: profile.refreshToken,
            },
          },
        },
      });
      await this.prisma.wallet.create({
        data: { userId: user.id, balance: 0 },
      });
    }

    return this.generateTokens(user.id);
  }

  private async generateTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        { secret: this.configService.get('JWT_SECRET'), expiresIn: '15m' }
      ),
      this.jwtService.signAsync(
        { sub: userId },
        { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '7d' }
      ),
    ]);

    // Store refresh token in Redis
    await this.redis.setex(`refresh:${userId}`, 7 * 24 * 60 * 60, refreshToken);

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private async processReferralBonus(referralCode: string, newUserId: string) {
    const referrer = await this.prisma.user.findUnique({
      where: { referralCode },
    });

    if (referrer) {
      // Credit referrer wallet
      await this.prisma.wallet.update({
        where: { userId: referrer.id },
        data: { balance: { increment: 50 } },
      });

      await this.prisma.walletTransaction.create({
        data: {
          walletId: referrer.id,
          type: 'REFERRAL',
          amount: 50,
          description: `Referral bonus for ${newUserId}`,
        },
      });
    }
  }
}
