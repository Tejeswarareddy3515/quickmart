import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface PaymentResponse {
  success: boolean;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
}

interface VerificationResponse {
  success: boolean;
  message: string;
  paymentId: string;
  orderId: string;
}

export function useRazorpayPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] =
    useState<PaymentResponse | null>(null);

  const createPaymentOrder = useCallback(
    async (
      orderId: string,
      amount: number,
      email: string,
      phone: string,
      name: string
    ) => {
      try {
        setIsProcessing(true);

        const token = localStorage.getItem("authToken");

        const response = await axios.post(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
          }/v1/payment/create-order`,
          {
            orderId,
            amount,
            email,
            phone,
            name,
          },
          {
            headers: {
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        setPaymentDetails(response.data);
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Failed to create payment order";
        toast.error(message);
        throw error;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const verifyPayment = useCallback(
    async (
      razorpayOrderId: string,
      razorpayPaymentId: string,
      razorpaySignature: string,
      orderId: string
    ) => {
      try {
        setIsProcessing(true);

        const token = localStorage.getItem("authToken");

        const response = await axios.post(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
          }/v1/payment/verify`,
          {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
            orderId,
          },
          {
            headers: {
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        toast.success("Payment verified successfully!");
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Payment verification failed";
        toast.error(message);
        throw error;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    isProcessing,
    paymentDetails,
    createPaymentOrder,
    verifyPayment,
  };
}