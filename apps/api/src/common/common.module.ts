import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { RedisService } from './services/redis.service';

@Module({
  providers: [PrismaService, RedisService],
  exports: [PrismaService, RedisService],
})
export class CommonModule {}