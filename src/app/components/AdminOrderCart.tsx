"use client";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  ShoppingBag,
  Truck,
} from "lucide-react";
import mongoose from "mongoose";
import React, { useState } from "react";

// Proper Interface taake error na aaye
interface IOrder {
  _id?: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  items: [
    {
      gerocery: mongoose.Types.ObjectId;
      name: string;
      category: string;
      price: string;
      unit: string;
      image: string;
      quantity: number;
    }
  ];
  totalammount: number;
  paymentmethod: "cod" | "online";
  adress: {
    name: string;
    mobileno: string;
    city: string;
    state: string;
    zipcode: string;
    fulllocation: string;
    latitude: number;
    longitude: number;
  };
  // Isay Populate compatible banaya gaya hai
  assignment: any; 
  deliveryrider: mongoose.Types.ObjectId;
  isPaid: boolean;
  status: "pending" | "out of delivery" | "deliverd";
  createdAt: Date;
  updatedAt: Date;
}

function AdminOrderCart({ order }: { order: IOrder }) {
  const [hide, sethide] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const updatestatus = async (orderId: string, newStatus: string) => {
    try {
      const result = await axios.post(
        `/api/admin/update_items_status/${orderId}`,
        { status: newStatus },
      );
      if (result.status === 200) {
        setCurrentStatus(newStatus as any);
      }
      console.log(result.data);
    } catch (error) {
      console.log("admin order cart wali file:", error);
    }
  };

  return (
    <div className="bg-white shadow-xl shadow-gray-200/40 rounded-xl p-6 md:p-10 border shadow-3xl border-gray-100 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 bg-yellow-500 rounded-full" />
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              Order{" "}
              <span className="text-yellow-500">
                #{order?._id?.toString().slice(-6)}
              </span>
            </h3>
          </div>
          <p className="text-gray-400 text-xs font-semibold uppercase pl-5">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
              order.isPaid
                ? "bg-green-50 text-green-600 border-green-100"
                : "bg-red-50 text-red-600 border-red-100"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            {order.isPaid ? "Payment Verified" : "Payment Pending"}
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
              currentStatus === "pending"
                ? "bg-yellow-50 text-yellow-600 border-yellow-100"
                : currentStatus === "out of delivery"
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-green-50 text-green-600 border-green-100"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                currentStatus === "pending"
                  ? "bg-yellow-500"
                  : currentStatus === "out of delivery"
                    ? "bg-blue-500"
                    : "bg-green-500"
              }`}
            ></span>
            {currentStatus}
          </div>

          {!order.isPaid && (
            <select
              className="text-[10px] font-bold uppercase tracking-wider border border-gray-200 rounded-2xl px-4 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all cursor-pointer hover:border-yellow-400"
              value={currentStatus}
              onChange={(e) =>
                updatestatus(order._id?.toString()!, e.target.value)
              }
            >
              {["pending", "out of delivery", "deliverd"].map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="py-6">
        <div className="bg-gray-100 rounded-xl border border-gray-300 overflow-hidden">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest">
                  Contact
                </th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest">
                  Shipping Address
                </th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-right">
                  Zip
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700">
                <td className="px-6 py-5 font-bold tracking-widest text-[12px] text-gray-900">
                  {order.adress.name}
                </td>
                <td className="px-6 py-5 text-[12px] tracking-widest font-bold">
                  {order.adress.mobileno}
                </td>
                <td className="px-6 py-5 text-[12px] tracking-widest font-bold">
                  <span className="capitalize">{order.adress.city}</span>,{" "}
                  {order.adress.state}
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="bg-white px-3 py-1 rounded-lg border border-gray-200 font-mono font-bold">
                    {order.adress.zipcode}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-4 border-b border-gray-100 pb-6">
        <button
          onClick={() => sethide((prev) => !prev)}
          className="w-full flex items-center justify-between group py-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
              <ShoppingBag
                size={18}
                className="text-yellow-600 group-hover:text-white transition-colors"
              />
            </div>
            <span className="text-[11px] font-black text-gray-900 uppercase">
              Order Summary ({order.items.length} items)
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white group-hover:text-yellow-600">
            {hide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {hide && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-gray-50 shadow-sm hover:border-yellow-200 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-gray-50 border border-gray-100"
                />
                <div className="flex-1">
                  <h4 className="text-[11px] font-bold text-gray-900 uppercase">
                    {item.name}
                  </h4>
                  <p className="text-[8px] text-gray-400 font-bold mt-1">
                    QTY: {item.quantity}
                  </p>
                </div>
                <p className="text-xs font-black text-gray-900">
                  Rs {Number(item.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-yellow-50/40 rounded-lg border border-yellow-100/50">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1 border-r border-yellow-200 pr-6">
            <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest">
              Payment via
            </span>
            <div className="flex items-center gap-2">
              {order.paymentmethod === "cod" ? (
                <Truck size={14} className="text-gray-900" />
              ) : (
                <CreditCard size={14} className="text-gray-900" />
              )}
              <span className="text-[11px] font-black text-gray-900 uppercase">
                {order.paymentmethod === "cod" ? "Cash" : "Online"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 border-r border-yellow-200 pr-6">
            <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest">
              Current Status
            </span>
            <span className="text-[11px] font-black text-gray-900 uppercase">
              {currentStatus}
            </span>
          </div>

          {/* Rider Details Section */}
          {order.assignment?.assignto ? (
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mt-2">
                Assigned Rider
              </span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center text-[8px] text-yellow-500 font-bold">
                  {order.assignment.assignto.name[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-900 uppercase leading-none">
                    {order.assignment.assignto.name}
                  </span>
                  <span className="text-[9px] font-bold text-gray-500">
                    {order.assignment.assignto.mobile}
                  </span>
                </div>
              </div>
            </div>
          ) : currentStatus === "out of delivery" ? (
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest">
                Rider Status
              </span>
              <span className="text-[10px] font-bold text-gray-400 italic animate-pulse">
                Searching...
              </span>
            </div>
          ) : null}
        </div>

        <div className="text-right">
          <p className="text-[10px] font-black text-yellow-600 mb-1 tracking-widest">
            Total Amount Payable
          </p>
          <h2 className="text-xl font-black text-gray-800">
            <span className="text-xl font-black text-gray-800 mr-1">Rs</span>
            {Number(order.totalammount).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderCart;