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
    <div className="min-h-screen bg-[#F1F3F4] font-sans flex flex-col lg:overflow-hidden">
  <main className="flex-1 flex justify-center items-center px-4 pb-6">
    <div className="w-full max-w-2xl">
      <Link
        href="/"
className="group inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#0d4e46] text-white text-xs font-bold shadow-md hover:bg-[#083631] hover:text-gray-400 transition-all duration-300 active:scale-95"
>
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Link>

      <div className="bg-white shadow-xl rounded-[2rem] p-6 md:p-10 border border-white">
        <div className="text-center mb-6">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">
            <PlusCircle className="w-5 h-5 text-[#0d4e46]" />
            <span>
              Add <span className="text-[#0d4e46]">Grocery</span>
            </span>
          </h1>
          <div className="w-10 h-1 bg-[#BEF383] mx-auto mb-2 rounded-full"></div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            Update your inventory details
          </p>
        </div>

        <form className="space-y-4" onSubmit={handle_save_records}>
          <div className="space-y-1">
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Grocery Name<span className="text-red-500 pl-1">*</span>
            </label>
            <input
              type="text"
              placeholder="eg. Fresh Milk"
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="w-full px-4 py-2 text-xs font-bold rounded-xl border-none bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0d4e46]/20 transition-all placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Category<span className="text-red-500 pl-1">*</span>
              </label>
              <select
                className="w-full px-4 py-2 text-xs font-bold rounded-xl border-none bg-gray-200 text-gray-800 focus:outline-none appearance-none cursor-pointer"
                onChange={(e) => setcategory(e.target.value)}
                value={category}
              >
                {Geroceries_Category.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Unit<span className="text-red-500 pl-1">*</span>
              </label>
              <select
                className="w-full px-4 py-2 text-xs font-bold rounded-xl border-none bg-gray-200 text-gray-800 focus:outline-none appearance-none cursor-pointer"
                onChange={(e) => setcategory_unit(e.target.value)}
                value={category_unit}
              >
                {unit.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Price (Rs)<span className="text-red-500 pl-1">*</span>
            </label>
            <input
              type="number"
              placeholder="eg. 130"
              onChange={(e) => setprice(e.target.value)}
              value={price}
              className="w-full px-4 py-2 text-xs font-bold rounded-xl border-none bg-gray-200 text-gray-800 focus:outline-none transition-all placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0d4e46] shadow-sm group-hover:bg-[#BEF383] transition-colors">
                <Upload size={18} />
              </div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-tight">
                Click to upload <br /> product image
              </span>
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handle_gerocery_image}
              className="hidden"
            />

            {frontend_image && (
              <div className="relative w-16 h-16 rounded-xl border-2 border-white shadow-md overflow-hidden bg-white">
                <Image
                  src={frontend_image}
                  alt="preview"
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 flex items-center justify-center rounded-xl bg-[#0d4e46] text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#083631] transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Add gerocery to store"
            )}
          </button>
        </form>
      </div>
    </div>
  </main>
</div>
  );
}

export default Additems;
