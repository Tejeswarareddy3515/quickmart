import { IsEmail, IsString, MinLength, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  referralCode?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class PhoneLoginDto {
  @IsPhoneNumber()
  phone: string;
}

export class VerifyOtpDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @Length(6, 6)
  otp: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
