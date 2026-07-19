import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true, name: true, slug: true, price: true, mrp: true,
            discount: true, unit: true, images: true, stock: true, isActive: true,
          },
        },
      },
    });

    const total = cartItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
    const totalMRP = cartItems.reduce((sum, item) => sum + (Number(item.product.mrp) * item.quantity), 0);

    return {
      items: cartItems,
      summary: { total, totalMRP, savings: totalMRP - total, itemCount: cartItems.length, totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0) },
    };
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) throw new NotFoundException('Product not found');
    if (product.stock < quantity) throw new BadRequestException(`Only ${product.stock} items available`);

    const existingItem = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) throw new BadRequestException(`Only ${product.stock} items available`);
      await this.prisma.cartItem.update({ where: { id: existingItem.id }, data: { quantity: newQuantity } });
    } else {
      await this.prisma.cartItem.create({ data: { userId, productId, quantity } });
    }

    return this.getCart(userId);
  }

  async updateQuantity(userId: string, itemId: string, quantity: number) {
    if (quantity < 1) return this.removeFromCart(userId, itemId);

    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: itemId, userId },
      include: { product: true },
    });

    if (!cartItem) throw new NotFoundException('Cart item not found');
    if (cartItem.product.stock < quantity) throw new BadRequestException(`Only ${cartItem.product.stock} items available`);

    await this.prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
    return this.getCart(userId);
  }

  async removeFromCart(userId: string, itemId: string) {
    await this.prisma.cartItem.deleteMany({ where: { id: itemId, userId } });
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return { message: 'Cart cleared successfully' };
  }
}
