"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-[#030303] text-white min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[140px]" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        <motion.div
          className="glass p-10 lg:p-14 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle size={56} className="text-emerald-400/80 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-2xl font-bold tracking-tight mb-2">Payment Successful</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Thank you for your order! Your payment has been processed and you will receive a confirmation shortly.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/store" className="btn-primary w-full flex items-center justify-center gap-2">
              <ShoppingBag size={14} /> Continue Shopping
            </Link>
            <Link href="/" className="btn-outline w-full flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
