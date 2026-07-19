"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const categories = [
  { name: "Fresh Fruits", icon: "🍎", color: "from-red-500/20 to-orange-500/20", count: "120+ items" },
  { name: "Vegetables", icon: "🥬", color: "from-green-500/20 to-emerald-500/20", count: "200+ items" },
  { name: "Dairy & Eggs", icon: "🥛", color: "from-blue-500/20 to-cyan-500/20", count: "80+ items" },
  { name: "Bakery", icon: "🍞", color: "from-amber-500/20 to-yellow-500/20", count: "60+ items" },
  { name: "Beverages", icon: "🥤", color: "from-purple-500/20 to-pink-500/20", count: "150+ items" },
  { name: "Snacks", icon: "🍿", color: "from-orange-500/20 to-red-500/20", count: "300+ items" },
  { name: "Household", icon: "🧼", color: "from-teal-500/20 to-cyan-500/20", count: "100+ items" },
  { name: "Personal Care", icon: "🧴", color: "from-rose-500/20 to-pink-500/20", count: "90+ items" },
];

export function CategoriesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Explore our wide range of categories and find everything you need
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group block"
              >
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 lg:p-8 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  <div className="text-4xl lg:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {category.count}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
