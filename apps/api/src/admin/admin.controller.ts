import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard stats' })
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('analytics/sales')
  @ApiOperation({ summary: 'Get sales analytics' })
  async getSalesAnalytics() {
    return this.adminService.getSalesAnalytics();
  }

  @Get('analytics/top-products')
  @ApiOperation({ summary: 'Get top products' })
  async getTopProducts() {
    return this.adminService.getTopProducts();
  }
}