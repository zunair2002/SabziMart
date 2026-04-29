"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import mongoose from "mongoose";
import OrderCart from "@/app/components/OrderCart";
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
function Myorders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const socket = getsocket();

  // 1. Socket Listener (Structure fix: data.orderid aur partial update)
  const handleStatusUpdate = (data: { orderid: string; status: IOrder['status'] }) => {
    console.log('Server se status update mila:', data);
    
    setOrders(currentOrders =>
      currentOrders.map(order => 
        // Backend se 'orderid' aa raha hai, isliye data.orderid check karein
        order._id?.toString() === data.orderid.toString() 
          ? { ...order, status: data.status } // Sirf status badlein, baki details (items, address) wahi rahein
          : order
      )
    );
  };

  socket.on('updatestatus', handleStatusUpdate);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/myorders");
      const data = await res.json();
      setOrders(data?.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();

  return () => {
    socket.off('updatestatus', handleStatusUpdate);
  };
}, []);

  return (
   <div className="min-h-screen bg-[#fdfdfd] font-sans py-10 px-4 md:px-10">
      <div className="max-w-[1100px] mx-auto">
       <div className="mb-6">
          <Link
            href="/user/cart"
            className="flex items-center gap-1 py-2.5 text-gray-900 text-sm font-bold hover:text-gray-600 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

<div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            My Order<span className="text-yellow-500"> History</span>
          </h1>
          <p className="text-gray-500 font-sm mt-1">
            shipping and payment details
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-yellow-500 animate-spin"></div>
            <p className="mt-6 text-[11px] font-black text-gray-900 uppercase tracking-[0.3em]">
              Fetching Your Orders
            </p>
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">
              Securely retrieving data
            </p>
          </div>
        ) : orders?.length === 0 ? (
          <div className="bg-white rounded-[40px] p-16 md:p-24 text-center border border-gray-50 shadow-2xl shadow-gray-100/50 flex flex-col items-center">
            <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center mb-8 rotate-3">
              <ShoppingBag className="w-10 h-10 text-yellow-500" />
            </div>

            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              No orders found
            </h3>

            <p className="text-gray-400 text-[11px] mt-3 max-w-xs font-bold uppercase tracking-widest leading-relaxed">
              Your purchase history is currently empty. Start exploring our premium collection.
            </p>

            <Link
              href="/"
              className="mt-10 px-12 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-yellow-500 transition-all active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-6">
            {orders?.map((order, index) => (
              <div key={index} className="group">
                 <OrderCart order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Myorders;
