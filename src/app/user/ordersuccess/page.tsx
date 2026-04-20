import React from 'react';
import { Check, ShoppingBag, ClipboardList } from 'lucide-react';
import Link from 'next/link';

const OrderSuccess = () => {
  return (
   <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-[#F1F3F4]">
  <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-2xl text-center">
    
    <div className="relative mx-auto w-20 h-20 mb-6">
      <div className="w-full h-full bg-[#0d4e46] rounded-full flex items-center justify-center shadow-lg shadow-green-200">
        <Check size={40} className="text-white stroke-[3px]" />
      </div>
    </div>

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
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#0d4e46] rounded-xl text-xs font-bold text-white shadow-md hover:bg-[#083631] transition-all active:scale-95"
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