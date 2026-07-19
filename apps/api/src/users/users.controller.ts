import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update profile' })
  async updateProfile(@CurrentUser('id') userId: string, @Body() body: any) {
    return this.usersService.updateProfile(userId, body);
  }

  @Get('addresses')
  @ApiOperation({ summary: 'Get addresses' })
  async getAddresses(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId).then(p => p.addresses);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'Add address' })
  async addAddress(@CurrentUser('id') userId: string, @Body() body: any) {
    return this.usersService.addAddress(userId, body);
  }

  @Get('wishlist')
  @ApiOperation({ summary: 'Get wishlist' })
  async getWishlist(@CurrentUser('id') userId: string) {
    return this.usersService.getWishlist(userId);
  }

  @Post('wishlist/:productId')
  @ApiOperation({ summary: 'Add to wishlist' })
  async addToWishlist(@CurrentUser('id') userId: string, @Param('productId') productId: string) {
    return this.usersService.addToWishlist(userId, productId);
  }

  @Delete('wishlist/:productId')
  @ApiOperation({ summary: 'Remove from wishlist' })
  async removeFromWishlist(@CurrentUser('id') userId: string, @Param('productId') productId: string) {
    return this.usersService.removeFromWishlist(userId, productId);
  }
}