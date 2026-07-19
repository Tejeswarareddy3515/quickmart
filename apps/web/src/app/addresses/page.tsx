"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, ShoppingBag, Heart, CreditCard, Bell, Settings, LogOut, ChevronRight, Camera } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: ShoppingBag, label: "My Orders", href: "/orders", description: "View order history and track deliveries" },
  { icon: Heart, label: "Wishlist", href: "/wishlist", description: "Saved items for later" },
  { icon: MapPin, label: "Addresses", href: "/addresses", description: "Manage delivery addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/payments", description: "Cards, UPI, and wallets" },
  { icon: Bell, label: "Notifications", href: "/notifications", description: "Notification preferences" },
  { icon: Settings, label: "Settings", href: "/settings", description: "App preferences and security" },
];

export default function AddressesPage() {
  const [user] = useState({
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    avatar: null,
    memberSince: "January 2024",
    orders: 23,
    wallet: 250,
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 mb-6"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
              <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
              <p className="text-sm text-slate-400 mt-1">Member since {user.memberSince}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{user.orders}</div>
              <div className="text-sm text-slate-500">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">₹{user.wallet}</div>
              <div className="text-sm text-slate-500">Wallet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">4.9★</div>
              <div className="text-sm text-slate-500">Rating</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <item.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
