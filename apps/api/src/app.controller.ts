import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return {
      success: true,
      message: '🚀 QuickMart API is running successfully!',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      docs: 'http://localhost:3001/api/docs',
      endpoints: {
        auth: '/auth',
        users: '/users',
        delivery: '/delivery',
        admin: '/admin',
        warehouse: '/warehouse',
      },
      status: {
        api: 'Running',
        database: 'Connected',
        redis: 'Connected',
      },
    };
  }
}