import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async getWarehouses() {
    return this.prisma.warehouse.findMany({
      include: { zones: true },
    });
  }

  async getInventory(warehouseId: string) {
    return this.prisma.inventoryLog.findMany({
      where: { product: { /* warehouse relation */ } },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async getLowStockProducts() {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        stock: { lte: 10 },
      },
      orderBy: { stock: 'asc' },
    });
  }
}
