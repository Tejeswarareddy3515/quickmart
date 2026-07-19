"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Users, Truck, Package, BarChart3, Settings, Bell, Search, Menu, X,
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, UserPlus, ArrowUpRight, ArrowDownRight,
  Calendar, Download, Filter
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders", active: false },
  { icon: Package, label: "Products", href: "/admin/products", active: false },
  { icon: Users, label: "Customers", href: "/admin/customers", active: false },
  { icon: Truck, label: "Delivery", href: "/admin/delivery", active: false },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics", active: false },
  { icon: Settings, label: "Settings", href: "/admin/settings", active: false },
];

const stats = [
  { label: "Total Revenue", value: "₹2,45,890", change: "+12.5%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
  { label: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", icon: ShoppingCart, color: "from-blue-500 to-indigo-500" },
  { label: "New Customers", value: "456", change: "+15.3%", trend: "up", icon: UserPlus, color: "from-purple-500 to-pink-500" },
  { label: "Active Delivery", value: "89", change: "-2.1%", trend: "down", icon: Truck, color: "from-orange-500 to-red-500" },
];

const recentOrders = [
  { id: "#QM001", customer: "Rahul Sharma", items: 5, total: 450, status: "Delivered", time: "2 min ago" },
  { id: "#QM002", customer: "Priya Patel", items: 3, total: 280, status: "Out for Delivery", time: "5 min ago" },
  { id: "#QM003", customer: "Amit Kumar", items: 8, total: 890, status: "Preparing", time: "8 min ago" },
  { id: "#QM004", customer: "Sneha Gupta", items: 2, total: 150, status: "Pending", time: "12 min ago" },
  { id: "#QM005", customer: "Vikram Singh", items: 6, total: 620, status: "Confirmed", time: "15 min ago" },
];

const topProducts = [
  { name: "Fresh Milk", sales: 1234, revenue: 39488, trend: "up" },
  { name: "Bananas", sales: 987, revenue: 38493, trend: "up" },
  { name: "Brown Bread", sales: 876, revenue: 21900, trend: "down" },
  { name: "Potatoes", sales: 765, revenue: 16830, trend: "up" },
  { name: "Onions", sales: 654, revenue: 11772, trend: "down" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/5 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">Q</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">QuickMart</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  item.active
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">admin@quickmart.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white">
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search orders, products..."
                  className="w-64 pl-10 pr-4 py-2 rounded-xl bg-slate-800 border border-white/5 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Sales Overview</h3>
                  <p className="text-sm text-slate-400">Revenue vs Orders</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium">7 Days</button>
                  <button className="px-3 py-1.5 rounded-lg text-slate-400 text-sm hover:text-white transition-colors">30 Days</button>
                </div>
              </div>
              {/* Simulated Chart */}
              <div className="h-64 flex items-end gap-2">
                {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-indigo-500/20 to-indigo-500 rounded-t-lg transition-all hover:from-indigo-400/30 hover:to-indigo-400" style={{ height: `${height}%` }} />
                    <span className="text-xs text-slate-500">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900 border border-white/5 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{product.name}</div>
                      <div className="text-xs text-slate-400">{product.sales} sales</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">₹{product.revenue.toLocaleString()}</div>
                      {product.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400 ml-auto" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                <p className="text-sm text-slate-400">Latest customer orders</p>
              </div>
              <Link href="/admin/orders" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Order ID</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Items</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Total</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{order.items} items</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">₹{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" :
                          order.status === "Out for Delivery" ? "bg-blue-500/10 text-blue-400" :
                          order.status === "Preparing" ? "bg-amber-500/10 text-amber-400" :
                          order.status === "Confirmed" ? "bg-indigo-500/10 text-indigo-400" :
                          "bg-slate-500/10 text-slate-400"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
