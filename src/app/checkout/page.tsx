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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">No items to checkout</p>
        <Link href="/store" className="btn-secondary text-sm">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-6">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono"
        >
          <ArrowLeft size={14} /> cd ~/cart
        </Link>
      </div>

      <section className="pb-24">
        <div className="max-w-lg mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-2">Checkout</h1>
            <p className="text-gray-400 mb-10">Review & Pay</p>
          </motion.div>

          <motion.div
            className="border border-gray-700 rounded-lg p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
              Order Items
            </h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.product.name}</p>
                    <p className="text-gray-600 text-xs">x{item.quantity}</p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 text-xs mt-1">
                Payment via KHQR / Cambodian banks
              </p>
            </div>

            {error && (
              <div className="border border-red-900 rounded-lg p-3 mb-4 bg-red-900/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <motion.button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
              whileHover={loading ? {} : { scale: 1.02 }}
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
