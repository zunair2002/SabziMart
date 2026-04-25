'use client'
import React from 'react';
import { Check, ShoppingBag, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

const OrderSuccess = () => {
  return (
   <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-white">
  <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-200 shadow-2xl text-center">
    
    <AnimatePresence>
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 12 }}
    className="relative mx-auto w-20 h-20 mb-6"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Check size={40} className="text-white stroke-[3px]" />
      </motion.div>
    </motion.div>
  </motion.div>
</AnimatePresence>

    <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-3 tracking-tight">
      Thank you for ordering!
    </h1>

    <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
      Your order has been placed successfully. We will notify you once your items are on the way.
    </p>

    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link 
        href="/user/myorders" 
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
      >
        <ClipboardList size={16} />
        View Order
      </Link>
      
      <Link 
        href="/" 
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-yellow-500 rounded-xl text-xs font-bold text-white shadow-md hover:bg-yellow-600 transition-all active:scale-95"
      >
        <ShoppingBag size={16} />
        Continue Shopping
      </Link>
    </div>

    <p className="mt-6 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
      Your order will be delivered within 20–25 minutes
    </p>
  </div>
</div>
  );
};

export default OrderSuccess;