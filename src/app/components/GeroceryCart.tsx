"use client";
import { addquantity, setcartdata, substractquantity } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Bell, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
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
  
  // Is line mein hum i._id use kar rahe hain
  const cartitems = cartdata.find((item) => item._id.toString() === i._id.toString());

  return (
<div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 w-full">
  <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-3 flex items-center justify-center h-40 w-full flex-shrink-0">
  <Image
    src={i.image}
    alt={i.name}
    width={192}  
    height={192}
    className="object-cover w-full h-full rounded-md"
  />
    <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-gray-100 transition">
      <Heart size={16} className="text-gray-600" />
    </button>
  </div>

  <p className="text-xs text-gray-500 font-medium mb-1 truncate">
    {i.category}
  </p>

  <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1">
    {i.name}
  </h3>

  <p className="text-xs text-gray-400 mb-2">
    {i.unit}
  </p>

  <p className="text-base font-bold text-orange-600 mb-3">
    Rs {Number(i.price).toLocaleString()}
  </p>

  <div className="flex items-center gap-2">
    <button className="flex items-center justify-center gap-1 flex-1 border border-gray-700 text-gray-700 text-[10px] font-medium py-2 rounded-lg hover:bg-orange-50 transition cursor-pointer">
      <Bell size={14} />
      Subscribe
    </button>

    {!cartitems ? (
      <button
        onClick={() => dispatch(setcartdata({ ...i, quantity: 1 }))}
        className="flex items-center justify-center gap-1 flex-1 bg-orange-600 text-white text-xs font-medium py-2 rounded-lg hover: pointer-cursor transition hover:bg-orange-700 transition cursor-pointer"
      >
        <ShoppingCart size={14} />
        Add to cart
      </button>
    ) : (
      <div className="flex items-center justify-between flex-1 bg-gray-100 rounded-lg p-1 h-[34px]">
        <button
          onClick={() => dispatch(substractquantity(i._id.toString()))}
          className="bg-orange-600 text-white w-6 h-6 flex items-center justify-center rounded-md shadow-sm hover:bg-orange-700 transition active:scale-90 cursor-pointer"
        >
          <Minus size={12} strokeWidth={3} />
        </button>

        <span className="text-xs font-bold text-gray-800">
          {cartitems.quantity}
        </span>

        <button
          onClick={() => dispatch(addquantity(i._id.toString()))}
          className="bg-orange-600 text-white w-6 h-6 flex items-center justify-center rounded-md shadow-sm hover:bg-orange-700 transition active:scale-90 cursor-pointer"
        >
          <Plus size={12} strokeWidth={3} />
        </button>
      </div>
    )}
  </div>
</div>
  );
}

export default GeroceryCart;