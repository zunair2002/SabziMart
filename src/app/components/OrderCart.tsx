import React, { useState } from 'react'
import mongoose from 'mongoose'
import { Box, ChevronDown, ChevronUp, CreditCard, MapPin, Truck } from 'lucide-react';
import { span } from 'motion/react-client';
interface IOrder{
    _id?:mongoose.Types.ObjectId,
    user?:mongoose.Types.ObjectId,
    items:[
        {
            gerocery:mongoose.Types.ObjectId,
            name: string,
            category: string,
            price: string,
            unit: string,
            image: string,
            quantity:number
        }
    ],
    totalammount:number,
    paymentmethod:'cod'|'online',
    adress:{
    name: string,
    mobileno: string,
    city: string,
    state: string,
    zipcode: string,
    fulllocation: string,
    latitude:number,
    longitude:number
    },
    isPaid:boolean,
    status:'pending'|'out of delivery'|'deliverd',
    createdAt: Date;
    updatedAt: Date;
}
function OrderCart({order}:{order:IOrder}) {
  const [hide,sethide] = useState(false);

  return (
   <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100 font-sans">
  <div className="bg-gray-200 p-6 px-8 flex flex-wrap items-center justify-between gap-y-6">
    <div className="flex flex-wrap gap-x-12 gap-y-4">
      <div>
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight opacity-80">Order number</p>
        <p className="text-sm font-black text-gray-900">#{order?._id?.toString().slice(-6).toUpperCase()}</p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight opacity-80">Chef / Grocery Seller</p>
        <p className="text-sm font-black text-gray-900">SabziMart Store</p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight opacity-80">Transit Type</p>
        <p className="text-sm font-black text-gray-900 uppercase">{order.paymentmethod === "cod" ? "Pickup/COD" : "Online/Delivery"}</p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight opacity-80">Scheduled for</p>
        <p className="text-sm font-black text-gray-900">
          {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className={`px-2 py-1 text-[8px] rounded-md font-bold uppercase ${order.isPaid ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>
        {order.isPaid ? "Paid" : "Unpaid"}
      </span>
      <button 
        onClick={() => sethide((prev) => !prev)}
className="text-gray-800 px-5 text-[15px] font-bold flex items-center gap-1 transition-all duration-300 group"
>
        {hide ? "Hide Details" : "Leave Review"} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </div>
  </div>

  {hide && (
    <div className="p-8 space-y-8">
      {order.items.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-1">
            <div className="w-25 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-2 shadow-sm">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border-2 border-white shadow-sm"></span>
                <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
              </div>
              <p className="text-sm text-gray-400 font-medium ml-4.5">Rs {item.price} per unit</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end md:gap-24 flex-1">
            <div className="text-gray-400 font-bold text-base">
              x {item.quantity}
            </div>
            <div className="text-gray-700 font-black text-md min-w-[100px] text-right">
              Rs {Number(item.price) * item.quantity}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  <div className="px-4 py-4 border-t border-gray-50 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
  order.status === "pending"
    ? "bg-yellow-50 text-yellow-600 border-yellow-100"
    : order.status === "out of delivery"
    ? "bg-blue-50 text-blue-600 border-blue-100"
    : "bg-green-50 text-green-600 border-green-100"
}`}>
  <div className="flex items-center gap-2">
    <span className={`w-1.5 h-1.5 rounded-full ${
      order.status === "pending" 
        ? "bg-yellow-500" 
        : order.status === "out of delivery" 
        ? "bg-blue-500" 
        : "bg-green-500"
    }`}></span>
    {order.status}
  </div>
</div>
      <div className="hidden md:flex items-center gap-1 text-gray-400 font-bold text-[11px] ml-4">
        <MapPin size={14} className='text-gray-400' /> {order.adress.city}
      </div>
    </div>

    <div className="flex items-center gap-6">
      <span className="text-md font-black text-gray-900">
        Rs {Number(order.totalammount).toLocaleString()}
      </span>
    </div>
  </div>
</div>
  )
}

export default OrderCart;
