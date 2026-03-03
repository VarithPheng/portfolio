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
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        <motion.div
          className="border border-gray-700 rounded-lg p-10 lg:p-14 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.15 }}
          >
            <CheckCircle
              size={56}
              className="text-green-400 mx-auto mb-6"
            />
          </motion.div>

          <h2 className="mb-3">Payment Successful</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Thank you for your order! Your payment has been processed and you
            will receive a confirmation shortly.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/store"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> Continue Shopping
            </Link>
            <Link
              href="/"
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
