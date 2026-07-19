import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalOrders, todayOrders, totalRevenue, todayRevenue, totalUsers, totalProducts, pendingOrders, activePartners] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.count({ where: { createdAt: { gte: today } } }),
      this.prisma.order.aggregate({ _sum: { total: true } }),
      this.prisma.order.aggregate({ where: { createdAt: { gte: today } }, _sum: { total: true } }),
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.count({ where: { status: { in: [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING] } } }),
      this.prisma.deliveryPartner.count({ where: { isOnline: true } }),
    ]);

    return {
      totalOrders,
      todayOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      todayRevenue: todayRevenue._sum.total || 0,
      totalUsers,
      totalProducts,
      pendingOrders,
      activePartners,
    };
  }

  async getSalesAnalytics(period: string = '7d') {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const orders = await this.prisma.order.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true, total: true, status: true },
    });

    const dailySales = this.groupByDay(orders);
    const statusCounts = this.countByStatus(orders);

    return { dailySales, statusCounts, totalOrders: orders.length };
  }

  async getTopProducts(limit: number = 10) {
    return this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, total: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });
  }

  private groupByDay(orders: any[]) {
    const map = new Map();
    orders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0];
      const existing = map.get(date) || { date, orders: 0, revenue: 0 };
      existing.orders += 1;
      existing.revenue += Number(order.total);
      map.set(date, existing);
    });
    return Array.from(map.values());
  }

  private countByStatus(orders: any[]) {
    const counts: Record<string, number> = {};
    orders.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }
}
