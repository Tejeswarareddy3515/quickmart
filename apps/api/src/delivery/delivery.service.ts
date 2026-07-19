import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async getAvailableOrders(partnerId: string) {
    const partner = await this.prisma.deliveryPartner.findUnique({
      where: { id: partnerId },
    });

    if (!partner || partner.status !== 'ACTIVE') {
      throw new BadRequestException('Partner not active');
    }

    return this.prisma.order.findMany({
      where: {
        status: OrderStatus.READY_FOR_PICKUP,
        deliveryPartnerId: null,
      },
      include: {
        items: { include: { product: { select: { name: true } } } },
        address: { select: { address: true, city: true, pincode: true, latitude: true, longitude: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async acceptOrder(partnerId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.status !== OrderStatus.READY_FOR_PICKUP) {
      throw new BadRequestException('Order not available');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        deliveryPartnerId: partnerId,
        status: OrderStatus.OUT_FOR_DELIVERY,
        deliveryStartedAt: new Date(),
      },
    });
  }

  async updateLocation(partnerId: string, lat: number, lng: number) {
    await this.prisma.deliveryPartner.update({
      where: { id: partnerId },
      data: { currentLatitude: lat, currentLongitude: lng },
    });

    // Update active order
    const activeOrder = await this.prisma.order.findFirst({
      where: { deliveryPartnerId: partnerId, status: OrderStatus.OUT_FOR_DELIVERY },
    });

    if (activeOrder) {
      await this.prisma.order.update({
        where: { id: activeOrder.id },
        data: { deliveryLatitude: lat, deliveryLongitude: lng },
      });
    }

    return { success: true };
  }

  async completeDelivery(partnerId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, deliveryPartnerId: partnerId },
    });

    if (!order) throw new NotFoundException('Order not found');

    return this.prisma.$transaction([
      this.prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.DELIVERED,
          deliveryCompletedAt: new Date(),
          actualDelivery: new Date(),
        },
      }),
      this.prisma.deliveryPartner.update({
        where: { id: partnerId },
        data: {
          totalDeliveries: { increment: 1 },
          earnings: { increment: 30 }, // Delivery fee
        },
      }),
    ]);
  }

  async getEarnings(partnerId: string, period: string = 'today') {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'today': startDate = new Date(now.setHours(0, 0, 0, 0)); break;
      case 'week': startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); break;
      case 'month': startDate = new Date(now.getFullYear(), now.getMonth(), 1); break;
      default: startDate = new Date(now.setHours(0, 0, 0, 0));
    }

    const [completedOrders, totalEarnings] = await Promise.all([
      this.prisma.order.count({
        where: { deliveryPartnerId: partnerId, status: OrderStatus.DELIVERED, createdAt: { gte: startDate } },
      }),
      this.prisma.order.aggregate({
        where: { deliveryPartnerId: partnerId, status: OrderStatus.DELIVERED, createdAt: { gte: startDate } },
        _sum: { deliveryFee: true },
      }),
    ]);

    return {
      completedOrders,
      earnings: totalEarnings._sum.deliveryFee || 0,
      period,
    };
  }
}
