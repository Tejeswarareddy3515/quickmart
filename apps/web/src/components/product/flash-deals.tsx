"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

const deals = [
  { id: "1", name: "Premium Rice", price: 149, mrp: 199, image: "🍚", sold: 85, total: 100 },
  { id: "2", name: "Cooking Oil", price: 89, mrp: 120, image: "🫒", sold: 62, total: 80 },
  { id: "3", name: "Fresh Paneer", price: 69, mrp: 95, image: "🧀", sold: 45, total: 60 },
  { id: "4", name: "Mixed Pulses", price: 55, mrp: 75, image: "🫘", sold: 38, total: 50 },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Timer className="w-5 h-5 text-red-500" />
      <div className="flex gap-1">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <span className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center font-mono font-bold text-sm">
              {String(value).padStart(2, "0")}
            </span>
            {key !== "seconds" && <span className="text-red-500 font-bold">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlashDeals() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Flash Deals
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Limited time offers, grab them now!
              </p>
            </div>
          </div>
          <CountdownTimer />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-red-100 dark:border-red-900/30 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
                  <span className="text-6xl lg:text-7xl">{deal.image}</span>
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg animate-pulse">
                    FLASH SALE
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{deal.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-red-500">₹{deal.price}</span>
                    <span className="text-sm text-slate-400 line-through">₹{deal.mrp}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Sold {deal.sold}</span>
                      <span>{deal.total - deal.sold} left</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(deal.sold / deal.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                    Add to Cart
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
