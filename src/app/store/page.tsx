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
    <div className="bg-[#030303] text-white min-h-screen">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[140px]" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      {/* Top bar */}
      <div className="w-full max-w-5xl mx-auto px-5 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
          <ArrowLeft size={14} /> Portfolio
        </Link>
        <Link href="/cart" className="relative flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors">
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Header */}
      <section className="pt-12 pb-12">
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-3">Cambodia Store</p>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Shop Local Goods</h1>
            <p className="text-white/40 text-sm mt-3 max-w-md">
              Handpicked Cambodian products — from Kampot pepper to handwoven silk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-24">
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="glass p-3 lg:p-4 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-white/80 text-sm font-medium leading-snug mb-1">{product.name}</h3>
                <p className="text-white/30 text-xs leading-relaxed mb-3 hidden lg:block">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-white/70 text-sm font-semibold">${product.price.toFixed(2)}</span>
                  <motion.button
                    onClick={() => handleAdd(product.id)}
                    className="glass-icon-sm !w-8 !h-8 hover:bg-white/10 transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    {added === product.id ? (
                      <span className="text-emerald-400 text-xs">&#10003;</span>
                    ) : (
                      <Plus size={14} className="text-white/60" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
