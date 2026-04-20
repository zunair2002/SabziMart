"use client";
import { addquantity, removecart, substractquantity } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";


function page() {
  const { cartdata, subtotal, totalammount, dileveryfee } = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="min-h-screen font-sans pb-20">
      <div className="max-w-[1400px] mx-auto p-6 flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0d4e46] text-white text-sm font-bold shadow-sm hover:text-gray-200 transition-all active:scale-11-"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 px-6">
        <div className="w-full lg:w-[70%]">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              My <span className="text-[#0d4e46]">Shopping Cart</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Review your items before checkout</p>
          </div>

          {cartdata.length === 0 ? (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-xl p-12 text-center">
              <div className="w-20 h-20 bg-[#F1F3F4] rounded-full flex items-center justify-center mb-6 shadow-md">
                <ShoppingBasket className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Your cart is currently empty</h2>
              <p className="text-gray-400 text-[10px] mt-2 mb-8 max-w-xs">
                Looks like you haven't added any groceries to your cart yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0d4e46] text-white rounded-full font-bold text-sm hover:bg-[#0a3d37] transition-all"
              >
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="grid grid-cols-12 px-8 py-4 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden md:grid">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total Price</div>
              </div>

              <div className="divide-y divide-gray-50">
                {cartdata.map((item, index) => (
                  <div key={index} className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors group">
                    <div className="grid grid-cols-12 items-center gap-4">
                      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                        <div className="w-24 h-24 bg-[#F1F3F4] rounded-xl flex-shrink-0 border border-gray-200 overflow-hidden p-2">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight truncate uppercase">
                            {item.name}
                          </h3>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                            {item.unit} • <span className="text-[#0d4e46]"> Rs {item.price}</span>
                          </p>
                          <button 
                            onClick={() => dispatch(removecart(item._id.toString()))}
                            className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase"
                          >
                            <Trash2 size={12} /> Remove Item
                          </button>
                        </div>
                      </div>
                      <div className="col-span-6 md:col-span-3 flex justify-center">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                          <button
                            onClick={() => dispatch(substractquantity(item._id.toString()))}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#BEF383] hover:bg-[#A8DE67] text-[#0d4e46] transition-colors"
                          >
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="w-10 text-center font-bold text-gray-800 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(addquantity(item._id.toString()))}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#BEF383] hover:bg-[#A8DE67] text-[#0d4e46] transition-colors"
                          >
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-6 md:col-span-3 text-right">
                        <p className="text-[10px] font-bold text-gray-400 md:hidden uppercase mb-1">Total</p>
                        <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">
                          Rs {(Number(item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full lg:w-[30%] mt-21">
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">
                Order <span className="text-[#0d4e46]">Summary</span>
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Subtotal</span>
                  <span className="text-gray-900 font-bold">Rs {subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Delivery Fee</span>
                  <span className="text-green-600 font-bold">Rs {dileveryfee}</span>
                </div>                
                <div className="pt-3 mt-1 border-t border-gray-300">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grand Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[1.5rem] font-black text-[#0d4e46] leading-none tracking-tighter">
                        {Number(totalammount).toLocaleString()}
                      </span>
                      <span className="text-sm font-black text-[#0d4e46] uppercase">Rs</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/user/checkout"
                className="flex items-center justify-center w-full mt-10 bg-[#0d4e46] text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-[#0d4e46]/20 hover:bg-[#0a3d37] transition-all active:scale-[0.98]"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 bg-[#F1F3F4] py-3 rounded-lg border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-[#BEF383] animate-pulse"></div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Secure SSL Checkout
                </p>
              </div>
            </div>

            <div className="mt-4 bg-[#BEF383] p-4 rounded-xl flex items-center gap-3 shadow-xl">
              <div className="bg-white/50 p-2 rounded-lg">
                <ShoppingBasket className="w-5 h-5 text-[#0d4e46]" />
              </div>
              <p className="text-[11px] font-bold text-[#0d4e46] uppercase leading-snug">
                Free shipping on all <br /> orders above Rs 1000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
