import { Controller, Post, Get, Body, Param, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create Razorpay order' })
  @ApiBody({
    schema: {
      properties: {
        orderId: { type: 'string' },
        amount: { type: 'number' },
        email: { type: 'string' },
        phone: { type: 'string' },
      },
    },
  })
  async createOrder(
    @CurrentUser('id') userId: string,
    @Body() body: { orderId: string; amount: number; email: string; phone: string },
  ) {
    return this.paymentService.createOrder(body.orderId, body.amount, userId, body.email, body.phone);
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify Razorpay payment' })
  @ApiBody({
    schema: {
      properties: {
        razorpayOrderId: { type: 'string' },
        razorpayPaymentId: { type: 'string' },
        razorpaySignature: { type: 'string' },
        orderId: { type: 'string' },
      },
    },
  })
  async verifyPayment(
    @Body()
    body: {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      orderId: string;
    },
  ) {
    return this.paymentService.verifyPayment(
      body.razorpayOrderId,
      body.razorpayPaymentId,
      body.razorpaySignature,
      body.orderId,
    );
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment details' })
  async getPaymentDetails(@Param('orderId') orderId: string) {
    return this.paymentService.getPaymentDetails(orderId);
  }

  @Post(':orderId/refund')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Refund payment' })
  @ApiBody({
    schema: {
      properties: {
        amount: { type: 'number' },
        reason: { type: 'string' },
      },
    },
  })
  async refundPayment(
    @Param('orderId') orderId: string,
    @Body() body: { amount?: number; reason?: string },
  ) {
    return this.paymentService.refundPayment(orderId, body.amount, body.reason);
  }
}
