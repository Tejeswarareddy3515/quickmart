import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WarehouseService } from './warehouse.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Warehouse')
@Controller('warehouse')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @Get()
  @ApiOperation({ summary: 'Get warehouses' })
  async getWarehouses() {
    return this.warehouseService.getWarehouses();
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Get low stock products' })
  async getLowStock() {
    return this.warehouseService.getLowStockProducts();
  }
}