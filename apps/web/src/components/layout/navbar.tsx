"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, X, MapPin, Moon, Sun, Mic } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/components/cart/cart-context";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { itemCount } = useCart();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/offers", label: "Offers" },
    { href: "/subscriptions", label: "Subscribe" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <span className="text-xl font-bold text-white">Q</span>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                isScrolled ? "text-slate-900 dark:text-white" : "text-white"
              }`}>
                QuickMart
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
                    isScrolled
                      ? "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className={`relative w-full group ${
                isScrolled ? "text-slate-600 dark:text-slate-400" : "text-white/60"
              }`}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm transition-all outline-none ${
                    isScrolled
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20"
                      : "bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/20"
                  }`}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Location */}
              <button className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                isScrolled
                  ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-white/80 hover:bg-white/10"
              }`}>
                <MapPin className="w-4 h-4" />
                <span className="max-w-[100px] truncate">Mumbai</span>
              </button>

              {/* Theme Toggle */}
              {isMounted ? (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`p-2 rounded-lg transition-all ${
                    isScrolled
                      ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              ) : (
                <div className={`p-2 rounded-lg ${isScrolled ? "text-slate-600 dark:text-slate-400" : "text-white/80"}`}>
                  <Moon className="w-5 h-5" />
                </div>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className={`relative p-2 rounded-lg transition-all ${
                  isScrolled
                    ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>

              {/* User */}
              <Link
                href="/profile"
                className={`p-2 rounded-lg transition-all ${
                  isScrolled
                    ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all ${
                  isScrolled
                    ? "text-slate-600 dark:text-slate-400"
                    : "text-white"
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-900 pt-20 px-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
