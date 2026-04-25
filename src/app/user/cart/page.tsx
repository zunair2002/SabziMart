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
import Navbar from "@/app/components/Navbar";


function page() {
  const { cartdata, subtotal, totalammount, dileveryfee } = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="relative min-h-screen bg-white font-sans pb-20 overflow-hidden">
  <div className="relative z-10">

    <div className="max-w-[1400px] mx-auto p-6 flex items-center">
      <Link
        href="/"
        className="flex items-center gap-1 py-2.5 text-gray-900 text-sm font-bold hover:text-gray-600 transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Continue Shopping</span>
      </Link>
    </div>

    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 px-6">

      <div className="w-full lg:w-[70%]">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            My Shopping<span className="text-yellow-500"> Cart</span>
          </h1>
          <p className="text-gray-500 font-sm mt-1">Review your premium grocery selection</p>
        </div>

        {cartdata.length === 0 ? (
          <div className="w-full min-h-[450px] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-[24px] border border-gray-200 shadow-xl p-12 text-center">

            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <ShoppingBasket className="w-10 h-10 text-yellow-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>

            <p className="text-gray-400 text-sm mt-2 mb-8 max-w-xs">
              Looks like you haven't added any fresh groceries to your cart yet.
            </p>

            <Link
  href="/"
  className="inline-flex items-center gap-1 text-yellow-500 font-bold text-base hover:text-yellow-600 transition-all"
>
  Start Shopping <ArrowRight className="w-5 h-5 mt-1" />
</Link>

          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-md rounded-[32px] border border-gray-200 shadow-2xl overflow-hidden">

  <div className="grid grid-cols-12 px-10 py-5 bg-gray-50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase hidden md:grid">
    <div className="col-span-6">Product Information</div>
    <div className="col-span-3 text-center">Quantity</div>
    <div className="col-span-3 text-right">Total</div>
  </div>

  <div className="divide-y divide-gray-100">

    {cartdata.map((item, index) => (
      <div key={index} className="p-6 md:p-10 hover:bg-gray-50 transition-colors group">

        <div className="grid grid-cols-12 items-center gap-6">

          <div className="col-span-12 md:col-span-6 flex items-center gap-6">

            <div className="w-28 h-28 bg-gray-100 rounded-3xl flex-shrink-0 border border-gray-100 overflow-hidden p-4 group-hover:scale-105 transition-transform duration-300">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>

            <div className="min-w-0">

              <h3 className="font-bold text-gray-900 text-xl leading-tight truncate">
                {item.name}
              </h3>

              <p className="text-xs font-bold text-gray-400 mt-2 flex items-center gap-2">
                {item.unit} • <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-md">Rs {item.price}</span>
              </p>

              <button
                onClick={() => dispatch(removecart(item._id.toString()))}
                className="mt-4 flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-400 transition-colors uppercase tracking-wider"
              >
                <Trash2 size={14} /> 
              </button>

            </div>

          </div>

          <div className="col-span-6 md:col-span-3 flex justify-center">

            <div className="flex items-center bg-gray-100 border border-gray-100 rounded-2xl p-1">

              <button
                onClick={() => dispatch(substractquantity(item._id.toString()))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm hover:text-red-500 transition-all active:scale-90"
              >
                <Minus size={14} strokeWidth={3} />
              </button>

              <span className="w-10 text-center font-bold text-gray-900 text-sm">
                {item.quantity}
              </span>

              <button
                onClick={() => dispatch(addquantity(item._id.toString()))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-yellow-500 text-white shadow-md hover:bg-yellow-600 transition-all active:scale-90"
              >
                <Plus size={14} strokeWidth={3} />
              </button>

            </div>

          </div>

          <div className="col-span-6 md:col-span-3 text-right">

            <p className="text-[10px] font-black text-gray-300 md:hidden uppercase mb-1">Subtotal</p>

            <span className="text-lg md:text-xl font-bold text-gray-900">
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
 <div className="w-full lg:w-[350px] space-y-4 mt-24">

      <div className="bg-white rounded-[24px] p-8 shadow-xl border border-gray-200 space-y-6">
        <h4 className="text-[18px] font-bold text-gray-800 tracking-tight">Order Total</h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-400 font-medium">Subtotal</span>
            <span className="text-gray-800 font-bold">Rs {subtotal}</span>
          </div>
          
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-400 font-medium">Delivery Fee</span>
            <span className="text-gray-800 font-bold">Rs {dileveryfee}</span>
          </div>

          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#3bb77e] font-medium">Discount</span>
            <span className="text-[#3bb77e] font-bold">- Rs 0.00</span>
          </div>

          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-400 font-medium">Tax</span>
            <span className="text-gray-800 font-bold">5%</span>
          </div>
        <hr className="border-gray-300" />
          <div className="flex justify-between items-center pt-5 border-t border-gray-50 mt-2">
            <span className="text-[14px] font-bold text-gray-800">Total</span>
            <span className="text-[18px] font-black text-gray-900 tracking-tight">
              Rs {Number(totalammount).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/user/checkout"
            className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-gray-600 transition-all active:scale-[0.98]"
          >
            Place Order
          </Link>
          
          <div className="mt-4 flex items-center justify-center gap-1.5 opacity-40">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
              Secure checkout powered by SabziMart
            </p>
          </div>
        </div>
      </div>
      
    </div>

    </div>

  </div>

</div>
  );
}

export default page;
