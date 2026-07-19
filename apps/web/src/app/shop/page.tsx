"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ShoppingCart, Heart, Star, ChevronDown, Grid3X3, LayoutList } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Beverages", "Snacks", "Household"];
const sortOptions = ["Popularity", "Price: Low to High", "Price: High to Low", "Newest", "Rating"];

const allProducts = [
  { id: "1", name: "Fresh Avocado", price: 49, mrp: 65, unit: "pc", image: "🥑", rating: 4.8, reviews: 234, category: "Fruits", isOrganic: true },
  { id: "2", name: "Organic Bananas", price: 39, mrp: 55, unit: "dozen", image: "🍌", rating: 4.6, reviews: 189, category: "Fruits", isOrganic: true },
  { id: "3", name: "Fresh Milk", price: 32, mrp: 38, unit: "500ml", image: "🥛", rating: 4.9, reviews: 567, category: "Dairy", isOrganic: false },
  { id: "4", name: "Brown Bread", price: 25, mrp: 35, unit: "400g", image: "🍞", rating: 4.5, reviews: 123, category: "Bakery", isOrganic: false },
  { id: "5", name: "Fresh Tomatoes", price: 28, mrp: 40, unit: "500g", image: "🍅", rating: 4.7, reviews: 345, category: "Vegetables", isOrganic: true },
  { id: "6", name: "Potatoes", price: 22, mrp: 30, unit: "1kg", image: "🥔", rating: 4.4, reviews: 278, category: "Vegetables", isOrganic: false },
  { id: "7", name: "Onions", price: 18, mrp: 25, unit: "500g", image: "🧅", rating: 4.3, reviews: 198, category: "Vegetables", isOrganic: false },
  { id: "8", name: "Fresh Carrots", price: 35, mrp: 48, unit: "500g", image: "🥕", rating: 4.6, reviews: 156, category: "Vegetables", isOrganic: true },
  { id: "9", name: "Orange Juice", price: 85, mrp: 110, unit: "1L", image: "🧃", rating: 4.5, reviews: 89, category: "Beverages", isOrganic: false },
  { id: "10", name: "Potato Chips", price: 20, mrp: 30, unit: "100g", image: "🥔", rating: 4.2, reviews: 412, category: "Snacks", isOrganic: false },
  { id: "11", name: "Detergent", price: 145, mrp: 180, unit: "1kg", image: "🧼", rating: 4.4, reviews: 234, category: "Household", isOrganic: false },
  { id: "12", name: "Apples", price: 120, mrp: 150, unit: "1kg", image: "🍎", rating: 4.7, reviews: 567, category: "Fruits", isOrganic: true },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const { ref, inView } = useInView({ threshold: 0 });
  const [displayCount, setDisplayCount] = useState(8);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High": return a.price - b.price;
      case "Price: High to Low": return b.price - a.price;
      case "Rating": return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  useEffect(() => {
    if (inView && displayCount < filteredProducts.length) {
      setDisplayCount((prev) => Math.min(prev + 4, filteredProducts.length));
    }
  }, [inView, filteredProducts.length, displayCount]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success("Removed from wishlist");
      } else {
        next.add(id);
        toast.success("Added to wishlist");
      }
      return next;
    });
  };

  const handleAddToCart = (product: typeof allProducts[0]) => {
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

  const displayedProducts = filteredProducts.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Shop All Products</h1>
          <p className="text-slate-500 dark:text-slate-400">{filteredProducts.length} products found</p>
        </motion.div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                showFilters
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <div className="flex bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${viewMode === "grid" ? "bg-indigo-500 text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${viewMode === "list" ? "bg-indigo-500 text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" : "space-y-4"}>
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group"
              >
                <div className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 ${viewMode === "list" ? "flex" : ""}`}>
                  <div className={`relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center ${viewMode === "list" ? "w-32 sm:w-48 shrink-0" : "aspect-square"}`}>
                    <span className="text-5xl lg:text-6xl transform group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? "text-red-500 fill-red-500" : "text-slate-400"}`} />
                    </button>
                    {product.isOrganic && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">ORGANIC</div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">₹{product.price}</span>
                        <span className="text-sm text-slate-400 line-through">₹{product.mrp}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-indigo-500/25"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Trigger */}
        {displayCount < filteredProducts.length && (
          <div ref={ref} className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
