import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get cart' })
  async getCart(@CurrentUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  async addToCart(@CurrentUser('id') userId: string, @Body() body: { productId: string; quantity: number }) {
    return this.cartService.addToCart(userId, body.productId, body.quantity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  async updateQuantity(@CurrentUser('id') userId: string, @Param('id') itemId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateQuantity(userId, itemId, body.quantity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeFromCart(@CurrentUser('id') userId: string, @Param('id') itemId: string) {
    return this.cartService.removeFromCart(userId, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  async clearCart(@CurrentUser('id') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
