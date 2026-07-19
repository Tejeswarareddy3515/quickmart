"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">Q</span>
              </div>
              <span className="text-xl font-bold text-white">QuickMart</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's fastest quick commerce platform. Fresh groceries delivered in 10 minutes, 24/7.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Press", "Partner with Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "FAQs", "Privacy Policy", "Terms of Service", "Refund Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-indigo-400" />
                support@quickmart.com
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-indigo-400" />
                1800-123-4567
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 QuickMart. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Zap className="w-4 h-4 text-green-500" />
            <span>Delivered with love in 10 minutes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
