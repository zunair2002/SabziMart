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
    <div className="bg-[#e5f5e0] shadow-xl rounded-2xl p-5 space-y-4 border border-gray-100">

  <div className="flex justify-between items-center border-b border-gray-100 pb-3">

    <div>
      <h3 className="text-[22px] font-bold text-gray-900">
        Order <span className="text-[#0d4e46]">#{order?._id?.toString().slice(-6)}</span>
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>

    <div className="flex gap-2">
      <span
        className={`px-3 py-1 text-[10px] rounded-full font-medium ${
          order.isPaid ? "bg-green-100 text-green-600" : "bg-[#aa0000] text-white"
        }`}
      >
        {order.isPaid ? "Paid" : "Unpaid"}
      </span>
    </div>

  </div>

  <div className="space-y-2">

    <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
      {order.paymentmethod === "cod" ? (
        <>
          <Truck size={15} className="text-[#0d4e46] font-bold" />
          <span> Cash on Delivery</span>
        </>
      ) : (
        <>
          <CreditCard size={15} className="text-[#0d4e46] font-bold" />
          <span> Online Payment</span>
        </>
      )}
    </div>

    <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
      <MapPin size={15} className="text-[#0d4e46]" />
      <span> {order.adress.city}, {order.adress.state}</span>
    </div>

  </div>

  <div className="flex items-center justify-between">

    <span className="text-xs font-medium text-gray-700">
      {hide ? "Hide items" : `View ${order.items.length} items`}
    </span>

    <button
      onClick={() => sethide((prev) => !prev)}
      className="p-2 rounded-full bg-[#0d4e46] text-white hover:bg-[#083631] transition"
    >
      {hide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>

  </div>
{hide && (
  <div className="bg-[#d2e1cf] rounded-xl p-3 space-y-2 border border-gray-100">

    {order.items.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-[#f7f7f7] p-3 rounded-xl border border-gray-100 hover:shadow-sm transition"
      >

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800 line-clamp-1">
              {item.name}
            </span>

            <span className="text-[11px] text-gray-400 font-medium">
              Quantity: {item.quantity}
            </span>
          </div>

        </div>

        <div className="text-sm font-bold text-[#0d4e46]">
          Rs {Number(item.price).toLocaleString()}
        </div>

      </div>
    ))}

  </div>
)}

  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
    <div className="flex items-center gap-2 text-xs text-gray-600">
  <div className="w-8 h-8 flex items-center justify-center">
    <Truck size={18} className="text-[#0d4e46]" />
  </div>

  <span className="font-medium text-[15px]">
    Delivery: <span className="text-[#0d4e46] font-semibold">{order.status}</span>
  </span>

</div>

    <div className="text-sm font-bold text-gray-800">
      Rs {Number(order.totalammount).toLocaleString()}
    </div>

  </div>

</div>
  )
}

export default OrderCart;
