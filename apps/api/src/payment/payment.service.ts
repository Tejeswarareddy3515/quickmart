import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;
  private prisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient();
    this.razorpay = new Razorpay({
      key_id: this.configService.get('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get('RAZORPAY_KEY_SECRET'),
    });
  }

  async createOrder(orderId: string, amount: number, customerId: string, email: string, phone: string) {
    try {
      // Create Razorpay order
      const razorpayOrder = await this.razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: orderId,
        notes: {
          orderId,
          customerId,
        },
      } as any);

      // Save payment record in database
      const payment = await this.prisma.payment.create({
        data: {
          orderId,
          amount: amount,
          method: 'RAZORPAY',
          status: 'PENDING',
          transactionId: (razorpayOrder as any).id,
          gatewayResponse: JSON.parse(JSON.stringify(razorpayOrder)),
        },
      });

      return {
        success: true,
        razorpayOrderId: (razorpayOrder as any).id,
        amount: (razorpayOrder as any).amount / 100,
        currency: (razorpayOrder as any).currency,
        key: this.configService.get('RAZORPAY_KEY_ID'),
        customerEmail: email,
        customerPhone: phone,
        orderNumber: orderId,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to create Razorpay order: ${error.message}`);
    }
  }

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    orderId: string,
  ) {
    try {
      // Verify Razorpay signature
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', this.configService.get('RAZORPAY_KEY_SECRET'))
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpaySignature) {
        throw new UnauthorizedException('Invalid payment signature');
      }

      // Fetch payment details from Razorpay
      const paymentDetails = await this.razorpay.payments.fetch(razorpayPaymentId);

      // Update payment status in database
      const payment = await this.prisma.payment.update({
        where: { orderId },
        data: {
          status: 'COMPLETED',
          transactionId: razorpayPaymentId,
          gatewayResponse: JSON.parse(JSON.stringify(paymentDetails)),
        },
      });

      // Update order status
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: 'COMPLETED',
        },
      });

      return {
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpayPaymentId,
        orderId,
      };
    } catch (error) {
      // Update payment status to failed
      await this.prisma.payment.update({
        where: { orderId },
        data: {
          status: 'FAILED',
        },
      });

      throw new BadRequestException(`Payment verification failed: ${error.message}`);
    }
  }

  async getPaymentDetails(orderId: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { orderId },
      });

      if (!payment) {
        throw new BadRequestException('Payment not found');
      }

      return payment;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch payment details: ${error.message}`);
    }
  }

  async refundPayment(orderId: string, refundAmount?: number, reason?: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { orderId },
      });

      if (!payment) {
        throw new BadRequestException('Payment not found');
      }

      if (payment.status !== 'COMPLETED') {
        throw new BadRequestException('Only completed payments can be refunded');
      }

      // Create refund in Razorpay
      const refund = await this.razorpay.payments.refund(payment.transactionId, {
        amount: refundAmount ? Math.round(refundAmount * 100) : undefined,
        notes: {
          reason,
        },
      } as any);

      // Update payment record
      const updatedPayment = await this.prisma.payment.update({
        where: { orderId },
        data: {
          status: 'REFUNDED',
          refundAmount: refundAmount || Number(payment.amount),
          refundReason: reason,
          refundedAt: new Date(),
          gatewayResponse: JSON.parse(JSON.stringify(refund)),
        },
      });

      return {
        success: true,
        refundId: (refund as any).id,
        refundAmount: (refund as any).amount / 100,
        message: 'Refund initiated successfully',
      };
    } catch (error) {
      throw new BadRequestException(`Refund failed: ${error.message}`);
    }
  }
}
