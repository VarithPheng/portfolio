"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-[#030303] text-white min-h-screen">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[140px]" />
        </div>
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8 pt-8">
          <Link href="/store" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Store
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <ShoppingBag size={48} className="text-white/10" />
          <p className="text-white/30 text-sm">Your cart is empty</p>
          <Link href="/store" className="btn-outline text-sm">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#030303] text-white min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[140px]" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-5 lg:px-8 pt-8 pb-4">
        <Link href="/store" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
          <ArrowLeft size={14} /> Back to Store
        </Link>
      </div>

      <section className="pb-24">
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="eyebrow mb-3">Your Cart</p>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-8">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            {/* Items */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  className="glass p-4 flex gap-4 items-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white/80 text-sm font-medium truncate">{item.product.name}</h3>
                    <p className="text-white/40 text-xs mt-0.5">${item.product.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="glass-icon-sm !w-7 !h-7 hover:bg-white/10 transition-colors"
                    >
                      <Minus size={12} className="text-white/50" />
                    </button>
                    <span className="text-white/70 text-sm w-6 text-center tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="glass-icon-sm !w-7 !h-7 hover:bg-white/10 transition-colors"
                    >
                      <Plus size={12} className="text-white/50" />
                    </button>
                  </div>
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="text-white/70 text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              className="glass p-6 h-fit lg:sticky lg:top-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h3 className="text-white/60 text-sm font-medium mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-white/40 text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/40 text-sm">
                  <span>Shipping</span>
                  <span className="text-white/30">Free</span>
                </div>
              </div>
              <div className="border-t border-white/[0.06] pt-3 mb-6">
                <div className="flex justify-between text-white/80 font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
