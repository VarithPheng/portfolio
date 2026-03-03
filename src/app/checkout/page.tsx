"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Payment creation failed");
      }

      const { payment_url } = await res.json();
      window.location.href = payment_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#030303] text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/30 text-sm">No items to checkout</p>
        <Link href="/store" className="btn-outline text-sm">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#030303] text-white min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[140px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-5 lg:px-8 pt-8 pb-4">
        <Link href="/cart" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
      </div>

      <section className="pb-24">
        <div className="w-full max-w-lg mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="eyebrow mb-3">Checkout</p>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-8">Review & Pay</h1>
          </motion.div>

          <motion.div
            className="glass p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <h3 className="text-white/60 text-sm font-medium mb-4">Order Items</h3>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-sm truncate">{item.product.name}</p>
                    <p className="text-white/30 text-xs">x{item.quantity}</p>
                  </div>
                  <p className="text-white/60 text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] pt-4 mb-6">
              <div className="flex justify-between text-white/80 font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-white/25 text-xs mt-1">Payment via KHQR / Cambodian banks</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <motion.button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
              whileHover={loading ? {} : { scale: 1.01 }}
              whileTap={loading ? {} : { scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Processing...
                </span>
              ) : (
                `Pay $${totalPrice.toFixed(2)}`
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
