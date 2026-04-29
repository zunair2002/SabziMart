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
import { getsocket } from "@/config/socketio";
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
    // 1. Fetch the initial list of orders when the page loads.
    const fetchInitialOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/get_items");
        const data = await res.json();
        setadminOrders(data);
      } catch (error) {
        console.error("Error fetching initial orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialOrders();
    const socket = getsocket();
    const handleNewOrder = (newOrder: IOrder) => {
      console.log('New order received via WebSocket:', newOrder);
      setadminOrders(prevOrders => [newOrder, ...prevOrders]);
    };
    const statusupdation = (data:{orderid:string,status:any})=>{
      console.log('socket sy status update: ',data);
      setadminOrders(prevOrders => 
      prevOrders.map(order => 
        // ID comparison hamesha string mein karein
        order._id?.toString() === data.orderid.toString() 
          ? { ...order, status: data.status } 
          : order
      )
    );
    }

    socket.on('neworders', handleNewOrder);
    socket.on('updatestatus', statusupdation);
    return () => {
      socket.off('neworders', handleNewOrder);
      socket.off('updatestatus', statusupdation);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfd] font-sans py-12 px-4 md:px-10">
  <div className="max-w-[1100px] mx-auto">
     <div className="mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 py-2.5 text-gray-900 text-sm font-bold hover:text-gray-600 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>
<div className="mb-8">
  <div className="flex items-center gap-2">
    <h1 className="text-3xl font-black text-gray-900">
      My Order<span className="text-yellow-500"> Management</span>
    </h1>
    <span className="px-2 py-1 mt-2 rounded-md bg-gray-100 text-gray-500 text-[8px] font-black uppercase tracking-widest">
      Admin Portal
    </span>
  </div>

  <p className="text-gray-500 font-sm mt-1">
    Monitoring and processing global customer transactions
  </p>
</div>
    {loading ? (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-16 h-16 rounded-full border-[6px] border-gray-50 border-t-yellow-500 animate-spin"></div>
        <p className="mt-8 text-[11px] font-black text-gray-900 uppercase">
          Fetching Data
        </p>
        <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold">
          Updating your administrative records
        </p>
      </div>
    ) : adminorders?.length === 0 ? (
      <div className="bg-white rounded-md p-20 md:p-32 text-center border border-gray-100 shadow-3xl flex flex-col items-center">
        <div className="w-24 h-24 bg-yellow-50 rounded-md flex items-center justify-center mb-10 rotate-6 border border-yellow-100">
          <ShoppingBag className="w-10 h-10 text-yellow-500" />
        </div>
        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
          Database is <span className="text-yellow-500">Empty</span>
        </h3>
        <p className="text-gray-400 text-[11px] mt-4 max-w-xs font-bold uppercase tracking-widest leading-relaxed">
          There are currently no active or past orders found in the system.
        </p>
        <Link
          href="/"
          className="mt-12 px-14 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-300 hover:bg-yellow-500 transition-all active:scale-95"
        >
          Check Shop Status
        </Link>
      </div>
    ) : (
      <div className="w-full space-y-10">
        <div className="flex items-center justify-between px-6 mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Showing {adminorders.length} total entries</span>
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
            </div>
        </div>
        {adminorders?.map((order, index) => (
          <AdminOrderCart key={index} order={order} />
        ))}
      </div>
    )}
  </div>
</div>
  );
}