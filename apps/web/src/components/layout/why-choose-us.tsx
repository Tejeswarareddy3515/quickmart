"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Truck, Shield, Headphones, Leaf, BadgePercent } from "lucide-react";

const features = [
  { icon: Clock, title: "10 Min Delivery", description: "Lightning fast delivery to your doorstep", color: "from-indigo-500 to-purple-500" },
  { icon: Truck, title: "Free Shipping", description: "Free delivery on orders above ₹500", color: "from-green-500 to-emerald-500" },
  { icon: Shield, title: "Secure Payments", description: "100% secure payment with encryption", color: "from-blue-500 to-cyan-500" },
  { icon: Headphones, title: "24/7 Support", description: "Round the clock customer assistance", color: "from-amber-500 to-orange-500" },
  { icon: Leaf, title: "Fresh Guarantee", description: "100% fresh or money back guarantee", color: "from-teal-500 to-green-500" },
  { icon: BadgePercent, title: "Best Prices", description: "Lowest prices guaranteed every day", color: "from-pink-500 to-rose-500" },
];

export function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose QuickMart?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            We're committed to providing the best shopping experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative p-6 lg:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
