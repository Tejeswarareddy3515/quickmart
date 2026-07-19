import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class NotificationsService {
  private firebase: any;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    try {
      const admin = require('firebase-admin');
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.configService.get('FIREBASE_PROJECT_ID'),
            privateKey: this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\n/g, '\n'),
            clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
          }),
        });
      }
      this.firebase = admin;
    } catch {}
  }

  async sendOrderNotification(userId: string, orderId: string, status: string) {
    const statusMessages: Record<string, string> = {
      PENDING: 'Your order has been placed!',
      CONFIRMED: 'Your order has been confirmed.',
      PREPARING: 'Your order is being prepared.',
      READY_FOR_PICKUP: 'Your order is ready for pickup!',
      OUT_FOR_DELIVERY: 'Your order is out for delivery!',
      NEARBY: 'Your delivery partner is nearby!',
      DELIVERED: 'Your order has been delivered! Enjoy!',
      CANCELLED: 'Your order has been cancelled.',
    };

    const message = statusMessages[status] || `Order status updated to ${status}`;

    await this.prisma.notification.create({
      data: {
        userId,
        type: 'ORDER_UPDATE',
        title: 'Order Update',
        message,
        data: { orderId, status },
      },
    });

    await this.sendPushNotification(userId, {
      title: 'Order Update',
      body: message,
      data: { orderId, status, type: 'ORDER_UPDATE' },
    });
  }

  async sendPushNotification(userId: string, payload: any) {
    if (!this.firebase) return;
    try {
      const tokens = await this.getUserFcmTokens(userId);
      if (tokens.length === 0) return;

      const messages = tokens.map(token => ({
        token,
        notification: { title: payload.title, body: payload.body },
        data: payload.data,
        android: { notification: { channelId: 'orders', priority: 'high' } },
        apns: { payload: { aps: { alert: { title: payload.title, body: payload.body }, badge: 1, sound: 'default' } } },
      }));

      await this.firebase.messaging().sendEach(messages);
    } catch (error) {
      console.error('Push notification error:', error);
    }
  }

  async getNotifications(userId: string, page: number = 1, limit: number = 20) {
    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    const unreadCount = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });

    return { notifications, total, unreadCount };
  }

  async markAsRead(notificationId: string, userId: string) {
    await this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true },
    });
    return { success: true };
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { success: true };
  }

  private async getUserFcmTokens(userId: string): Promise<string[]> {
    return [];
  }
}
