"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import mongoose from "mongoose";

const Geroceries_Category = [
      "Fruits & Veg",
      "Dairy & Eggs",
      "Meat & Fish",
      "Bakery",
      "Drinks",
      "Snacks",
      "Pantry",       
      "Frozen",
      "Household",
      "Personal Care",
      "Organic",
      "Pet Care",
      "Other"
];
const unit = [
          "kg",
          "g",
          "liter",
          "ml",
          "pack",
          "piece",
          "bottle",
          "box",
          "dozen",
          "bag",
          "jar",
          "can",
          "tube"
];
function Additems() {
  const [name, setname] = useState("");
  const [category, setcategory] = useState("Other");
  const [price, setprice] = useState("");
  const [loading, setloading] = useState(false);
  const [category_unit, setcategory_unit] = useState("kg");
  const [frontend_image, setfrontend_image] = useState<string | null>();
  const [backend_image, setbackend_image] = useState<File | null>();

   const handle_save_records = async(e:FormEvent)=>{
     e.preventDefault();
     setloading(true);
      try{
        const formData = new FormData()
        formData.append('name',name)
        formData.append('category',category)
        formData.append('unit',category_unit)
        formData.append('price',price)
        if(backend_image){
          formData.append('image',backend_image)
        }
        const result = await axios.post('/api/admin/add_items',formData)
        setloading(false);
        console.log(result.data)
            setname("");
            setcategory("Other");
            setcategory_unit("kg");
            setprice("");
            setfrontend_image(null);
            setbackend_image(null);
        
      }
      catch(error){
        console.log(error)
        setloading(false);
      }
    }

  const handle_gerocery_image = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    //image ko [0] index sy uthaya
    const file = files[0];
    //backend may set
    setbackend_image(file);
    //frontend may set
    setfrontend_image(URL.createObjectURL(file));
  };
  return (
 <div className="min-h-screen bg-white font-sans p-4 md:p-8">
  <div className="max-w-[1400px] mx-auto">
    {/* Back Button matching the reference style */}
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-yellow-500 transition-colors mb-8 group"
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      Continue Shopping
    </Link>

    {/* Header Section matching reference image typography */}
    <div className="mb-10">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Add <span className="text-yellow-500">Grocery</span>
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Review and update your premium grocery inventory selection
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Main Form Container - Compact Height */}
      <div className="lg:col-span-8 bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] p-6 md:p-8">
        <form onSubmit={handle_save_records} className="space-y-5">
          
          {/* Row 1: Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
              Grocery Name
            </label>
            <input
              type="text"
              placeholder="Enter product name..."
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="w-full px-5 py-3 text-sm font-semibold rounded-xl border-none bg-gray-200 text-gray-900 focus:ring-2 focus:ring-yellow-500/20 transition-all placeholder:text-gray-500"
            />
          </div>

          {/* Row 2: Category & Unit (Side by Side to save height) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Category
              </label>
              <select
                className="w-full px-5 py-3 text-sm font-semibold rounded-xl border-none bg-gray-200 text-gray-900 appearance-none cursor-pointer focus:ring-2 focus:ring-yellow-500/20"
                onChange={(e) => setcategory(e.target.value)}
                value={category}
              >
                {Geroceries_Category.map((i, index) => (
                  <option key={index} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Unit
              </label>
              <select
                className="w-full px-5 py-3 text-sm font-semibold rounded-xl border-none bg-gray-200 text-gray-900 appearance-none cursor-pointer focus:ring-2 focus:ring-yellow-500/20"
                onChange={(e) => setcategory_unit(e.target.value)}
                value={category_unit}
              >
                {unit.map((i, index) => (
                  <option key={index} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Price & Image Upload (Side by Side for compact view) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Price (Rs)
              </label>
              <input
                type="number"
                placeholder="0.00"
                onChange={(e) => setprice(e.target.value)}
                value={price}
                className="w-full px-5 py-3 text-sm font-semibold rounded-xl border-none bg-gray-200 text-gray-900 focus:ring-2 focus:ring-yellow-500/20 placeholder:text-gray-500"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-between px-5 py-3 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Upload size={18} className="text-gray-600" />
                  <span className="text-xs font-bold text-gray-600 uppercase">Upload Image</span>
                </div>
                {frontend_image && (
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-white">
                    <Image src={frontend_image} alt="preview" width={32} height={32} className="object-cover" />
                  </div>
                )}
              </label>
              <input id="imageUpload" type="file" accept="image/*" onChange={handle_gerocery_image} className="hidden" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 rounded-2xl bg-gray-900 text-white font-bold text-sm uppercase hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-gray-200"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Add Item to Store"}
          </button>
        </form>
      </div>

      {/* Right Side Summary Panel (Inspired by the 'Order Total' in ref) */}
      <div className="lg:col-span-4 bg-gray-100 rounded-[2rem] p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Inventory Summary</h2>
        <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Item Name</span>
            <span className="text-gray-900">{name || "---"}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Category</span>
            <span className="text-gray-900">{category || "---"}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Unit Type</span>
            <span className="text-gray-900">{category_unit || "---"}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total Price</span>
          <span className="text-2xl font-black text-gray-900">Rs {price || 0}</span>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-8 uppercase font-bold tracking-tighter">
            Secure Admin Dashboard Powered by SabziMart
        </p>
      </div>
    </div>
  </div>
</div>
  );
}

export default Additems;
