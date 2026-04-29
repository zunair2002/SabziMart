"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Trash2,
  RotateCcw,
  Package,
  Loader2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import mongoose from "mongoose";
interface Igerocery {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
}
export default function ViewItemsPage() {
  const [groceryData, setGroceryData] = useState<Igerocery[]>(
    [] as Igerocery[],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroceryData = async () => {
      try {
        const response = await fetch("/api/admin/veiw-items");
        const data = await response.json();
        if (response.ok) {
          setGroceryData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroceryData();
  }, []);

  return (
    <div className="min-h-screen font-sans p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:max-w-xl">
            <Link
              href="/"
              className="flex items-center gap-1 py-3 text-gray-900 text-sm font-bold hover:text-gray-600 transition-all active:scale-95 whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-3 bg-yellow-500 text-white border border border-gray-200 rounded-xl hover:bg-yellow-600 text-white transition-colors">
              <Filter size={18} />
            </button>
            <div className="h-10 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Inventory Status
              </p>
              <p className="text-[12px] font-black text-gray-800">
                {groceryData.length} Items in Store
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 text-[10px] font-black text-gray-500 uppercase items-center border-b border-gray-200 ">
          <div className="col-span-1 flex justify-left">
            <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
              <MoreHorizontal size={35} />
            </button>
          </div>

          <div className="col-span-5">Product Details</div>
          <div className="col-span-2 text-center">Category</div>
          <div className="col-span-1 text-center">Price</div>
          <div className="col-span-1 text-center">Unit</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              Synchronizing...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {groceryData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 lg:px-8 py-5 bg-white border-b border-gray-200 hover:bg-gray-50 transition-all"
              >
                <div className="hidden lg:block col-span-1 flex justify-center">
                  <label className="relative cursor-pointer">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white flex items-center justify-center transition-all duration-200 peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:border-yellow-400">
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-all"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                </div>

                <div className="col-span-1 lg:col-span-5 flex items-center gap-5">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 leading-tight uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Premium Quality Assets
                    </p>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-2 text-center">
                  <span className="inline-block text-[9px] font-black text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full uppercase tracking-tighter">
                    {item.category}
                  </span>
                </div>

                <div className="col-span-1 lg:col-span-1 text-center font-black text-gray-900 text-sm">
                  Rs {item.price}
                </div>

                <div className="col-span-1 lg:col-span-1 text-center font-bold text-gray-400 text-[10px] uppercase tracking-widest">
                  {item.unit}
                </div>

                <div className="col-span-1 lg:col-span-2 flex justify-end items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                    Edit
                  </button>
                  <div className="flex gap-1 ml-2">
                    <button className="p-2 text-red-500 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {groceryData.length === 0 && (
              <div className="py-32 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-black text-gray-900 uppercase">
                  Inventory is Empty
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                  Start adding premium products to your catalog
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase">
            <span className="hover:text-yellow-500 cursor-pointer transition-colors">
              Help Center
            </span>
            <span className="hover:text-yellow-500 cursor-pointer transition-colors">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
