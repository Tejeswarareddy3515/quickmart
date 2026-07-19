import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from '../common/services/prisma.service';
import { RedisService } from '../common/services/redis.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, RedisService],
  exports: [CartService],
})
export class CartModule {}
