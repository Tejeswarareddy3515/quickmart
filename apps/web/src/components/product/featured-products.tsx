"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingCart, Heart, Star, Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import toast from "react-hot-toast";

const products = [
  { id: "1", name: "Fresh Avocado", price: 49, mrp: 65, unit: "pc", image: "🥑", rating: 4.8, reviews: 234 },
  { id: "2", name: "Organic Bananas", price: 39, mrp: 55, unit: "dozen", image: "🍌", rating: 4.6, reviews: 189 },
  { id: "3", name: "Fresh Milk", price: 32, mrp: 38, unit: "500ml", image: "🥛", rating: 4.9, reviews: 567 },
  { id: "4", name: "Brown Bread", price: 25, mrp: 35, unit: "400g", image: "🍞", rating: 4.5, reviews: 123 },
  { id: "5", name: "Fresh Tomatoes", price: 28, mrp: 40, unit: "500g", image: "🍅", rating: 4.7, reviews: 345 },
  { id: "6", name: "Potatoes", price: 22, mrp: 30, unit: "1kg", image: "🥔", rating: 4.4, reviews: 278 },
  { id: "7", name: "Onions", price: 18, mrp: 25, unit: "500g", image: "🧅", rating: 4.3, reviews: 198 },
  { id: "8", name: "Fresh Carrots", price: 35, mrp: 48, unit: "500g", image: "🥕", rating: 4.6, reviews: 156 },
];

export function FeaturedProducts() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      quantity: 1,
      image: product.image,
      unit: product.unit,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section ref={ref} className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Handpicked fresh items just for you
            </p>
          </div>
          <a href="/shop" className="hidden sm:inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
            View All
            <Plus className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <span className="text-6xl lg:text-7xl transform group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </span>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
                  </button>
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{product.mrp}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-indigo-500/25"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
