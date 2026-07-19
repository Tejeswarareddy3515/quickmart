"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Navigation, Phone, Package, Clock, DollarSign, Star, Power, ChevronRight,
  User, Settings, LogOut, Bike, CheckCircle, XCircle, AlertCircle
} from "lucide-react";

export default function DeliveryApp() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [activeOrder, setActiveOrder] = useState<any>(null);

  const availableOrders = [
    { id: "#QM102", items: 5, distance: "1.2 km", earnings: 45, address: "123 Main St, Andheri", customer: "Rahul S." },
    { id: "#QM103", items: 3, distance: "0.8 km", earnings: 35, address: "456 Park Ave, Bandra", customer: "Priya P." },
    { id: "#QM104", items: 8, distance: "2.1 km", earnings: 60, address: "789 Beach Rd, Juhu", customer: "Amit K." },
  ];

  const earnings = {
    today: 450,
    week: 2840,
    month: 12450,
    deliveries: 89,
    rating: 4.8,
  };

  const acceptOrder = (order: any) => {
    setActiveOrder({ ...order, status: "picked_up", progress: 0 });
  };

  const updateStatus = (status: string) => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status, progress: status === "delivered" ? 100 : activeOrder.progress + 33 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bike className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">QuickMart Partner</h1>
              <p className="text-xs text-slate-400">Delivery Partner</p>
            </div>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isOnline
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            <Power className="w-4 h-4" />
            {isOnline ? "Online" : "Offline"}
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-2 p-4">
        <div className="bg-slate-900 border border-white/5 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-white">₹{earnings.today}</div>
          <div className="text-xs text-slate-400">Today</div>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-white">{earnings.deliveries}</div>
          <div className="text-xs text-slate-400">Deliveries</div>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-lg font-bold text-white">{earnings.rating}</span>
          </div>
          <div className="text-xs text-slate-400">Rating</div>
        </div>
      </div>

      {/* Active Order */}
      <AnimatePresence>
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-4 mb-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-4 shadow-lg shadow-indigo-500/20"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-white">{activeOrder.id}</h3>
                <p className="text-sm text-indigo-200">{activeOrder.items} items • ₹{activeOrder.earnings}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Progress */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${activeOrder.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex gap-2">
              {activeOrder.status === "picked_up" && (
                <button onClick={() => updateStatus("out_for_delivery")} className="flex-1 py-3 bg-white text-indigo-600 font-semibold rounded-xl text-sm">
                  Start Delivery
                </button>
              )}
              {activeOrder.status === "out_for_delivery" && (
                <button onClick={() => updateStatus("nearby")} className="flex-1 py-3 bg-white text-indigo-600 font-semibold rounded-xl text-sm">
                  Mark Nearby
                </button>
              )}
              {activeOrder.status === "nearby" && (
                <button onClick={() => updateStatus("delivered")} className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl text-sm">
                  Mark Delivered
                </button>
              )}
              {activeOrder.status === "delivered" && (
                <div className="flex-1 py-3 bg-green-500/20 text-green-400 font-semibold rounded-xl text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Delivered
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-indigo-200">
              <MapPin className="w-4 h-4" />
              {activeOrder.address}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Available Orders */}
      {!activeOrder && isOnline && (
        <div className="px-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Available Orders</h3>
          {availableOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900 border border-white/5 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{order.id}</h4>
                  <p className="text-sm text-slate-400">{order.items} items • {order.distance}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">₹{order.earnings}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                <MapPin className="w-4 h-4" />
                {order.address}
              </div>
              <button
                onClick={() => acceptOrder(order)}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors"
              >
                Accept Order
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {!isOnline && !activeOrder && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4">
            <Power className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">You are offline</h3>
          <p className="text-sm text-slate-400 mb-6">Go online to start receiving delivery requests</p>
          <button
            onClick={() => setIsOnline(true)}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
          >
            Go Online
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {[
            { id: "orders", icon: Package, label: "Orders" },
            { id: "earnings", icon: DollarSign, label: "Earnings" },
            { id: "map", icon: Navigation, label: "Map" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.id ? "text-indigo-400" : "text-slate-500"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom padding for nav */}
      <div className="h-20" />
    </div>
  );
}
