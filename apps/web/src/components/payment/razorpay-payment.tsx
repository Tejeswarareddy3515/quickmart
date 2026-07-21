"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  amount: number;
  orderId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  razorpayKey: string;
  razorpayOrderId: string;
  onSuccess: (paymentId: string, signature: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

export default function RazorpayPayment({
  amount,
  orderId,
  customerEmail,
  customerPhone,
  customerName,
  razorpayKey,
  razorpayOrderId,
  onSuccess,
  onError,
  isProcessing,
}: RazorpayPaymentProps) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load Razorpay script
    if (!window.Razorpay && !scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
      };
      script.onerror = () => {
        onError("Failed to load Razorpay. Please try again.");
      };
      document.body.appendChild(script);
    }
  }, [onError]);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      onError("Razorpay is not loaded. Please try again.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      order_id: razorpayOrderId,
      name: "QuickMart",
      description: `Order #${orderId}`,
      image: "/logo.png",
      prefill: {
        email: customerEmail,
        contact: customerPhone,
        name: customerName,
      },
      theme: {
        color: "#4F46E5",
      },
      handler: async (response: any) => {
        onSuccess(response.razorpay_payment_id, response.razorpay_signature);
      },
      modal: {
        ondismiss: () => {
          onError("Payment cancelled by user");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isProcessing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Processing...
        </>
      ) : (
        `Pay ₹${amount.toFixed(2)} with Razorpay`
      )}
    </button>
  );
}
