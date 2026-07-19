"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Smartphone, Star, Download } from "lucide-react";

export function DownloadApp() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Get the QuickMart App
            </h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              Download our app for the best experience. Track orders in real-time, get exclusive app-only deals, and enjoy seamless shopping.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                <Download className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-70">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-indigo-100 text-sm">4.9 rating on App Store</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-72 h-[500px] mx-auto bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
              <div className="p-4 pt-10 h-full bg-gradient-to-b from-indigo-900 to-slate-900">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">Q</span>
                  </div>
                  <h3 className="text-white font-bold">QuickMart</h3>
                </div>
                <div className="space-y-3">
                  {["🥑 Fresh Avocado", "🍎 Red Apples", "🥛 Fresh Milk", "🍞 Brown Bread"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-2xl">{item.split(" ")[0]}</span>
                      <span className="text-white text-sm">{item.split(" ").slice(1).join(" ")}</span>
                      <span className="ml-auto text-green-400 text-xs font-bold">+</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
