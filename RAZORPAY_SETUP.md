# Razorpay Integration Setup Guide

## ✅ Credentials Configured

Your Razorpay credentials have been added to `.env`:

```
RAZORPAY_KEY_ID=TUVVA TEJESWARA REDDY
RAZORPAY_KEY_SECRET=TBqBT10wf18GU8
```

## 📋 Features Implemented

### Backend (NestJS API)

**Payment Module** (`apps/api/src/payment/`)
- `payment.service.ts` - Razorpay integration logic
- `payment.controller.ts` - Payment endpoints
- `payment.module.ts` - Module configuration

**API Endpoints:**
- `POST /payment/create-order` - Create Razorpay order
- `POST /payment/verify` - Verify payment signature
- `GET /payment/:orderId` - Get payment details
- `POST /payment/:orderId/refund` - Refund payment

### Frontend (Next.js)

**Payment Components** (`apps/web/src/components/payment/`)
- `razorpay-payment.tsx` - Razorpay checkout button

**Hooks** (`apps/web/src/hooks/`)
- `use-razorpay-payment.ts` - Payment hook with create order & verify functions

**Updated Pages:**
- `apps/web/src/app/checkout/page.tsx` - Integrated Razorpay payment

## 🚀 How to Use

### 1. Checkout Flow
1. User selects "Online Payment" as payment method
2. Click "Proceed to Payment"
3. Razorpay checkout modal opens
4. User completes payment with UPI/Card/Wallet
5. Payment is verified and order is created

### 2. Integration Example

```typescript
// Use the hook
const { createPaymentOrder, verifyPayment, paymentDetails } = useRazorpayPayment();

// Create order
const paymentInfo = await createPaymentOrder(
  orderId,
  amount,
  email,
  phone,
  name
);

// Handle successful payment
const result = await verifyPayment(
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  orderId
);
```

## 📱 Testing Razorpay

### Test Cards:
- **Success**: `4111 1111 1111 1111` (Visa)
- **Failure**: `4000 0000 0000 0002` (Visa)
- **OTP**: Any 6-digit number

### Test UPI:
- Success: `success@razorpay`
- Failure: `fail@razorpay`

### Test Wallets:
- Razorpay Wallet Test: `9876543210`

## 🔧 Environment Variables

Required for production:

```env
RAZORPAY_KEY_ID=your_actual_key_id
RAZORPAY_KEY_SECRET=your_actual_key_secret
NEXT_PUBLIC_API_URL=https://your-api.com
JWT_SECRET=your-secret-key
```

## 📚 Payment Status Flow

```
PENDING → COMPLETED (on successful verification)
       → FAILED (on verification failure)
       → REFUNDED (after refund)
```

## 🔒 Security Features

✅ HMAC SHA256 signature verification
✅ Secure payment status updates
✅ JWT authentication on payment endpoints
✅ Order validation before payment

## 🐛 Troubleshooting

### Payment Not Working?
1. Verify API keys in `.env`
2. Check browser console for errors
3. Ensure NEXT_PUBLIC_API_URL is set
4. Verify JWT token is valid

### Signature Verification Failed?
1. Check RAZORPAY_KEY_SECRET is correct
2. Verify timestamp hasn't expired
3. Check orderId matches

## 📖 API Documentation

Full Swagger documentation available at:
```
http://localhost:3001/api/docs
```

Navigate to the "Payment" section to test endpoints.

## 🎯 Next Steps

1. **Add Payment Analytics** - Track conversion rates
2. **Add Refund Management** - Admin dashboard for refunds
3. **Add Payment History** - User transaction history
4. **Add Subscription Payments** - For recurring orders
5. **Add Multiple Payment Methods** - Stripe, PayPal integration

---

For more information, visit: https://razorpay.com/docs/
