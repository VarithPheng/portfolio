"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto py-6">
          <Link
            href="/store"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono"
          >
            <ArrowLeft size={14} /> cd ~/store
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <ShoppingBag size={48} className="text-gray-800" />
          <p className="text-gray-500 text-sm">Your cart is empty</p>
          <Link href="/store" className="btn-secondary text-sm">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-6">
        <Link
          href="/store"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono"
        >
          <ArrowLeft size={14} /> cd ~/store
        </Link>
      </div>

      <section className="pb-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-2">Your Cart</h1>
            <p className="text-gray-400 mb-10">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Items */}
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  className="border border-gray-700 rounded-lg p-4 flex gap-4 items-center hover:bg-gray-900/40 transition-colors"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-colors"
                    >
                      <Minus size={12} className="text-gray-400" />
                    </button>
                    <span className="text-sm w-6 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-colors"
                    >
                      <Plus size={12} className="text-gray-400" />
                    </button>
                  </div>
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-gray-700 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              className="border border-gray-700 rounded-lg p-6 h-fit lg:sticky lg:top-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-gray-600">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="btn-primary w-full text-center block"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
