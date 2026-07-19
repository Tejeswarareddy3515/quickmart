import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, phone: true, name: true, avatar: true,
        role: true, referralCode: true, createdAt: true,
        addresses: true,
        wallet: { select: { balance: true } },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { name: data.name, phone: data.phone, avatar: data.avatar },
      select: { id: true, email: true, phone: true, name: true, avatar: true },
    });
  }

  async addAddress(userId: string, data: any) {
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }
    return this.prisma.address.create({
      data: { ...data, userId },
    });
  }

  async updateAddress(userId: string, addressId: string, data: any) {
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }
    return this.prisma.address.update({
      where: { id: addressId, userId },
      data,
    });
  }

  async deleteAddress(userId: string, addressId: string) {
    await this.prisma.address.deleteMany({
      where: { id: addressId, userId },
    });
    return { success: true };
  }

  async getWishlist(userId: string) {
    const items = await this.prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          select: { id: true, name: true, slug: true, price: true, mrp: true, images: true, stock: true },
        },
      },
    });
    return items;
  }

  async addToWishlist(userId: string, productId: string) {
    try {
      await this.prisma.wishlistItem.create({
        data: { userId, productId },
      });
    } catch {
      throw new ConflictException('Already in wishlist');
    }
    return this.getWishlist(userId);
  }

  async removeFromWishlist(userId: string, productId: string) {
    await this.prisma.wishlistItem.deleteMany({
      where: { userId, productId },
    });
    return this.getWishlist(userId);
  }
}
