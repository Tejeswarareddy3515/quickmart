"use client";

import { motion } from "framer-motion";
import { CheckCircle, MapPin, Clock, Package, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Order Placed", time: "Just now", completed: true },
    { label: "Confirmed", time: "2 min", completed: progress > 30 },
    { label: "Preparing", time: "5 min", completed: progress > 50 },
    { label: "Out for Delivery", time: "8 min", completed: progress > 75 },
    { label: "Delivered", time: "10 min", completed: progress >= 100 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Order Placed!</h1>
          <p className="text-slate-500 dark:text-slate-400">Your order #QM123456 has been confirmed</p>
        </motion.div>

        {/* Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Live Tracking</h3>
              <p className="text-sm text-slate-500">Estimated delivery: 10 mins</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-indigo-500 animate-bounce" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-green-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  step.completed ? "bg-green-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                }`}>
                  {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                    {step.label}
                  </div>
                </div>
                <div className="text-sm text-slate-400">{step.time}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Link
            href="/track"
            className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors"
          >
            <Package className="w-5 h-5" />
            Track Order
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
