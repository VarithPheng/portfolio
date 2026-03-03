"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, ArrowLeft } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function StorePage() {
  const { addItem, totalItems } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem(product);
      setAdded(productId);
      setTimeout(() => setAdded(null), 800);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="container mx-auto flex items-center justify-between py-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono"
        >
          <ArrowLeft size={14} /> cd ~/portfolio
        </Link>
        <Link
          href="/cart"
          className="relative flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Header */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4">Cambodia Store</h1>
            <p className="text-gray-400 max-w-md">
              Handpicked Cambodian products — from Kampot pepper to handwoven
              silk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="border border-gray-700 rounded-lg bg-gray-900/20 hover:bg-gray-900/40 transition-colors overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="relative aspect-square bg-gray-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-base font-medium mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                    <motion.button
                      onClick={() => handleAdd(product.id)}
                      className="w-10 h-10 border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      {added === product.id ? (
                        <span className="text-green-400 text-sm">&#10003;</span>
                      ) : (
                        <Plus size={16} className="text-gray-400" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
