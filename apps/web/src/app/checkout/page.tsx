"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, CreditCard, Wallet, Banknote, Smartphone, ChevronRight, Shield, Truck, Clock } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import RazorpayPayment from "@/components/payment/razorpay-payment";
import { useRazorpayPayment } from "@/hooks/use-razorpay-payment";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

const addresses = [
  { id: "1", label: "Home", address: "123 Main Street, Andheri West", city: "Mumbai", pincode: "400053", isDefault: true },
  { id: "2", label: "Work", address: "456 Business Park, BKC", city: "Mumbai", pincode: "400051", isDefault: false },
];

const paymentMethods = [
  { id: "razorpay", name: "Online Payment", icon: CreditCard, description: "Credit/Debit Card, UPI, Wallet" },
  { id: "wallet", name: "Wallet", icon: Wallet, description: "QuickMart Wallet: ₹0" },
  { id: "cod", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive" },
];

export default function CheckoutPage() {
  const { items, total, itemCount } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const { createPaymentOrder, verifyPayment, paymentDetails, isProcessing: isPaymentProcessing } = useRazorpayPayment();

  const deliveryFee = total > 500 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  const handleRazorpaySuccess = async (paymentId: string, signature: string) => {
    if (!paymentDetails) return;
    
    try {
      setIsProcessing(true);
      await verifyPayment(
        paymentDetails.razorpayOrderId,
        paymentId,
        signature,
        paymentDetails.orderNumber
      );

      // Create order after successful payment
      const orderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/orders`,
        {
          items,
          total: grandTotal,
          deliveryAddress: selectedAddress,
          paymentMethod: "razorpay",
          paymentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success("Payment successful! Order confirmed.");
      localStorage.removeItem("cart");
      setTimeout(() => {
        window.location.href = `/order-success?orderId=${orderResponse.data.id}`;
      }, 1000);
    } catch (error: any) {
      toast.error("Payment verification failed");
    } finally {
      setIsProcessing(false);
      setShowRazorpay(false);
    }
  };

  const handleRazorpayError = (error: string) => {
    toast.error(error);
    setShowRazorpay(false);
  };

  const handlePlaceOrder = async () => {
    if (selectedPayment === "razorpay" && !showRazorpay) {
      // Initialize Razorpay payment
      setShowRazorpay(true);
      const orderId = `ORD-${Date.now()}`;
      
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        await createPaymentOrder(
          orderId,
          grandTotal,
          user.email || "customer@quickmart.com",
          user.phone || "9999999999",
          user.name || "Customer"
        );
      } catch (error) {
        setShowRazorpay(false);
      }
      return;
    }

    setIsProcessing(true);
    try {
      // Create order in database
      const orderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/orders`,
        {
          items,
          total: grandTotal,
          deliveryAddress: selectedAddress,
          paymentMethod: selectedPayment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success("Order placed successfully!");
      // Clear cart
      localStorage.removeItem("cart");
      setTimeout(() => {
        window.location.href = `/order-success?orderId=${orderResponse.data.id}`;
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
      setShowRazorpay(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
          <Link href="/shop" className="text-indigo-500 hover:text-indigo-600 font-medium">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Checkout</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Complete your order in a few steps</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Delivery Address</h2>
                  <p className="text-sm text-slate-500">Select where you want your order delivered</p>
                </div>
              </div>

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedAddress.id === addr.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900 dark:text-white">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{addr.address}</p>
                        <p className="text-sm text-slate-500">{addr.city}, {addr.pincode}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAddress.id === addr.id ? "border-indigo-500 bg-indigo-500" : "border-slate-300 dark:border-slate-600"
                      }`}>
                        {selectedAddress.id === addr.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button className="mt-4 text-indigo-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-1">
                + Add New Address
              </button>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Payment Method</h2>
                  <p className="text-sm text-slate-500">Choose how you want to pay</p>
                </div>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      selectedPayment === method.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedPayment === method.id ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                    }`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white">{method.name}</div>
                      <div className="text-sm text-slate-500">{method.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id ? "border-indigo-500 bg-indigo-500" : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {selectedPayment === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Delivery Instructions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Delivery Instructions (Optional)</h2>
              <textarea
                placeholder="Add any special instructions for delivery..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
              />
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.quantity} x ₹{item.price}</div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-medium transition-colors">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Place Order / Razorpay */}
              {showRazorpay && paymentDetails ? (
                <RazorpayPayment
                  amount={paymentDetails.amount}
                  orderId={paymentDetails.orderNumber}
                  customerEmail={paymentDetails.customerEmail}
                  customerPhone={paymentDetails.customerPhone}
                  customerName={JSON.parse(localStorage.getItem("user") || "{}").name || "Customer"}
                  razorpayKey={paymentDetails.key}
                  razorpayOrderId={paymentDetails.razorpayOrderId}
                  onSuccess={handleRazorpaySuccess}
                  onError={handleRazorpayError}
                  isProcessing={isProcessing}
                />
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {selectedPayment === "razorpay" ? "Proceed to Payment" : "Place Order"}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure & encrypted payment</span>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Truck className="w-3 h-3" />
                  <span>Estimated delivery: 10-15 mins</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Real-time order tracking</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
