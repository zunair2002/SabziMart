"use client";
import { addquantity, substractquantity } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
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
import { useDispatch, useSelector } from "react-redux";

function page() {
  const { cartdata } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="relative min-h-screen bg-white">
      <Link
        href="/"
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-bold shadow-lg hover:bg-orange-700 transition-all z-50 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </Link>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 p-6 pt-24">
        <div className="w-full lg:w-[70%]">
          {cartdata.length === 0 ? (
            <div className="w-full min-h-[450px] flex flex-col items-center justify-center gap-4 p-12 text-center bg-gray-50 rounded-3xl border-1 border-gray-200 shadow-lg">
              <div className="bg-white p-6 rounded-full shadow-sm">
                <ShoppingBasket className="w-16 h-16 text-gray-300" />
              </div>
              <div className="space-y-1">
                <h2 className="text-1xl font-bold text-orange-600">
                  Your Cart is Empty
                </h2>
                <p className="text-gray-500 max-w-xs mx-auto text-xs mt-5">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
              <Link
                href="/"
                className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:underline"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 mt-1" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl">
              {cartdata.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-6 px-6 border-b border-gray-200 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Trash2 className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-600 transition-colors" />
                  </div>
                  <div className="relative bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center h-24 w-24 flex-shrink-0 border border-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                 <div className="flex flex-col flex-1 min-w-0 ml-2">
  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
    {item.name}
  </h3>

  <div className="mt-2 flex flex-col gap-1 items-start">
    <span className="inline-block bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
      {item.unit}
    </span>
    <span className="inline-block bg-orange-300 text-gray-500 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
      {Number(item.price).toLocaleString()}
    </span>
  </div>
</div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-sm transition-all active:scale-90 cursor-pointer"
                      onClick={() => dispatch(addquantity(item._id.toString()))}
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>

                    <span className="min-w-[24px] text-center font-bold text-gray-800 text-base">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-sm transition-all active:scale-90 cursor-pointer"
                      onClick={() =>
                        dispatch(substractquantity(item._id.toString()))
                      }
                    >
                      <Minus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                  <div className="text-right min-w-[120px] pr-4 mr-4">
                    <span className="text-gray-900 font-extrabold text-xl whitespace-nowrap">
                      Rs {(Number(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-[30%]">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200 shadow-xl">
              <h3 className="text-xl font-black text-gray-800 mb-6 tracking-tight">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>Rs 34,000</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">
                    Rs 50,000
                  </span>
                </div>
              </div>

              <button className="w-full mt-8 bg-orange-600 text-white py-2 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg active:scale-95 hover: pointer-cursor transition">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
