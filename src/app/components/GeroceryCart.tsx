"use client";
import { addquantity, setcartdata, substractquantity } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Bell, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import mongoose from "mongoose";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface Igerocery {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
}

function GeroceryCart({ i }: { i: Igerocery }) {
  const dispatch = useDispatch<AppDispatch>();
  const { cartdata } = useSelector((state: RootState) => state.cart);
  const cartitems = cartdata.find((item) => item._id.toString() === i._id.toString());

  return (
<div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col w-full group hover:shadow-md transition-all duration-300 max-w-[220px] mx-auto">
  <div className="relative w-full aspect-square bg-[#f8f8f8] flex items-center justify-center p-3">
    <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-110">
      <Image
        src={i.image}
        alt={i.name}
        fill
        sizes="(max-width: 768px) 100px, 150px"
        className="object-contain"
      />
    </div>
    <button className="absolute top-2 right-2 text-red-400 hover:text-red-500 transition-colors z-10">
      <Heart size={16} />
    </button>
  </div>

  <div className="p-2.5 flex flex-col gap-1.5">
    <div className="flex gap-1.5 flex-wrap">
      <span className="bg-gray-200 text-gray-500 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
        {i.category || 'Fruit'}
      </span>
    </div>

    <h3 className="text-xs md:text-sm font-black text-gray-700 truncate">
      {i.name}
    </h3>

    <div className="flex justify-between items-center">
      <div className="flex items-baseline">
        <span className="text-sm md:text-base font-black text-gray-900">
          RS {Math.floor(Number(i.price))}
        </span>
        <span className="text-[10px] font-bold text-gray-900">.00</span>
      </div>
      
      <div className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded-md">
        <Star size={10} className="text-yellow-400 fill-yellow-400" />
        <span className="text-[9px] font-black text-gray-600">4.7</span>
      </div>
    </div>

    <div className="mt-2">
      {!cartitems ? (
        <button
          onClick={() => dispatch(setcartdata({ ...i, quantity: 1 }))}
          className="w-full bg-[#f6f6f6] hover:bg-[#ffbb38] hover:text-white text-gray-400 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] transition-all duration-300 uppercase"
        >
          Add To Cart
        </button>
      ) : (
        <div className="flex items-center justify-between bg-[#f6f6f6] h-8 rounded-lg px-1.5">
          <button
            onClick={() => dispatch(substractquantity(i._id.toString()))}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-100 transition-colors"
          >
            <Minus size={12} strokeWidth={3} />
          </button>

          <span className="text-xs font-black text-gray-800 px-1">
            {cartitems.quantity}
          </span>

          <button
            onClick={() => dispatch(addquantity(i._id.toString()))}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-100 transition-colors"
          >
            <Plus size={12} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  </div>
</div>
  );
}

export default GeroceryCart;