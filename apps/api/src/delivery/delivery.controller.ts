import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Delivery')
@Controller('delivery')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Get('orders/available')
  @ApiOperation({ summary: 'Get available orders' })
  async getAvailableOrders(@CurrentUser('id') userId: string) {
    return this.deliveryService.getAvailableOrders(userId);
  }

  @Post('orders/:orderId/accept')
  @ApiOperation({ summary: 'Accept order' })
  async acceptOrder(@CurrentUser('id') userId: string, @Param('orderId') orderId: string) {
    return this.deliveryService.acceptOrder(userId, orderId);
  }

  @Put('location')
  @ApiOperation({ summary: 'Update location' })
  async updateLocation(@CurrentUser('id') userId: string, @Body() body: { lat: number; lng: number }) {
    return this.deliveryService.updateLocation(userId, body.lat, body.lng);
  }

  @Post('orders/:orderId/complete')
  @ApiOperation({ summary: 'Complete delivery' })
  async completeDelivery(@CurrentUser('id') userId: string, @Param('orderId') orderId: string) {
    return this.deliveryService.completeDelivery(userId, orderId);
  }

  @Get('earnings')
  @ApiOperation({ summary: 'Get earnings' })
  async getEarnings(@CurrentUser('id') userId: string, @Body() body: { period?: string }) {
    return this.deliveryService.getEarnings(userId, body?.period);
  }
}