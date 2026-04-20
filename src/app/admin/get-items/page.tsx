"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import mongoose from "mongoose";
import {
  ArrowLeft,
  Truck,
  CreditCard,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
} from "lucide-react";
import AdminOrderCart from "@/app/components/AdminOrderCart";
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
    },
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
  isPaid: boolean;
  status: "pending" | "out of delivery" | "deliverd";
  createdAt: Date;
  updatedAt: Date;
}
export default function OrdersPage() {
  const [adminorders, setadminOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/admin/get_items");
        const data = await res.json();

        setadminOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F3F4] font-sans py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0d4e46] text-white text-[13px] font-bold shadow-md hover:bg-[#083631] transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase">
  Order <span className="text-[#0d4e46]">History</span>
  <span className="text-[12px] font-medium text-gray-400 ml-2 normal-case">
    (admin)
  </span>
</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Track and manage your previous purchases
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 rounded-full border-4 border-[#0d4e46]/20 border-t-[#0d4e46] animate-spin"></div>

            <p className="mt-4 text-sm font-bold text-[#0d4e46] uppercase tracking-widest">
              Loading Orders...
            </p>

            <p className="text-[11px] text-gray-400 mt-1">
              Please wait a moment
            </p>
          </div>
        ) : adminorders?.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-white shadow-xl flex flex-col items-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mb-6" />
            <h3 className="text-2xl font-black text-gray-800 uppercase">
              No orders found
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-xs font-medium uppercase">
              Start shopping now and place your first order today
            </p>
            <Link
              href="/"
              className="mt-10 px-12 py-4 bg-[#0d4e46] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#083631] transition-all active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-8">
            {adminorders?.map((order, index) => (
              <AdminOrderCart key={index} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
