"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, MessageSquare, Navigation, Package, CheckCircle, Truck, User } from "lucide-react";

export default function TrackingPage() {
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 75) return prev;
        return prev + 1;
      });
      setEta((prev) => (prev > 2 ? prev - 0.1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Order Placed", time: "10:00 AM", completed: true, icon: Package },
    { label: "Confirmed", time: "10:02 AM", completed: true, icon: CheckCircle },
    { label: "Preparing", time: "10:05 AM", completed: progress > 30, icon: Clock },
    { label: "Out for Delivery", time: progress > 50 ? "10:08 AM" : "--", completed: progress > 50, icon: Truck },
    { label: "Delivered", time: "--", completed: progress >= 100, icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Live Tracking</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Order #QM123456</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl h-64 sm:h-80 mb-6 relative overflow-hidden border border-indigo-200 dark:border-indigo-800/30"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-indigo-500 mx-auto mb-2 animate-pulse" />
              <p className="text-indigo-700 dark:text-indigo-300 font-medium">Live Map View</p>
              <p className="text-sm text-indigo-500 dark:text-indigo-400">Partner is {eta.toFixed(0)} mins away</p>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <motion.path
              d="M 50 250 Q 150 200 200 150 Q 250 100 350 50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="250" r="8" fill="#6366f1" />
            <motion.circle
              cx="350"
              cy="50"
              r="8"
              fill="#ec4899"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle r="6" fill="#22c55e" stroke="white" strokeWidth="2">
              <animateMotion dur="10s" repeatCount="indefinite" path="M 50 250 Q 150 200 200 150 Q 250 100 350 50" />
            </motion.circle>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Vikram Singh</h3>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <span className="text-amber-400">★</span>
                  <span>4.8 (234 deliveries)</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Order Status</h3>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  step.completed ? "bg-green-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                      {step.label}
                    </h4>
                    <span className="text-sm text-slate-400">{step.time}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-6 w-0.5 ml-5 mt-1 ${steps[i + 1].completed ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
