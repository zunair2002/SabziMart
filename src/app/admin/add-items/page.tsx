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
  <div className="min-h-dvh flex flex-col bg-gray-50">
  <Link
    href="/"
    className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold shadow-lg hover:bg-orange-700 transition cursor-pointer z-10"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>Back to Home</span>
  </Link>

  <main className="flex-1 flex justify-center items-center px-4 py-8">
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="flex items-center justify-center gap-3 text-2xl font-extrabold text-orange-600 mb-2">
          <PlusCircle className="w-5 h-5" />
          <span>Grocery List</span>
        </h1>
        <p className="text-sm text-gray-700 font-sm">
          Fill out the details below to add new grocery items to your inventory
        </p>
      </div>

      <form className="space-y-6" onSubmit={handle_save_records}>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">
            Grocery Name<span className="text-red-600 pl-1">*</span>
          </label>
          <input
            type="text"
            placeholder="eg. Fresh Milk"
            onChange={(e) => setname(e.target.value)}
            value={name}
            className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Category<span className="text-red-600 pl-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition"
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

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Unit<span className="text-red-600 pl-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition"
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

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">
            Price (Rs)<span className="text-red-600 pl-1">*</span>
          </label>
          <input
            type="number"
            placeholder="eg. 130"
            onChange={(e) => setprice(e.target.value)}
            value={price}
            className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
  <label
    htmlFor="imageUpload"
    className="flex flex-col items-center justify-center cursor-pointer"
  >
    <Upload className="w-5 h-5 mb-1" />
    <span className="text-sm text-gray-700">Upload Product Image</span>
  </label>

  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={handle_gerocery_image}
    className="hidden"
  />

  {frontend_image && (
    <div className="relative w-32 h-32 mt-2 rounded-xl border-2 border-orange-200 shadow-lg overflow-hidden bg-white">
      <Image
        src={frontend_image}
        alt="preview"
        fill
        className="object-contain p-2"
      />
    </div>
  )}
</div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-md flex items-center justify-center rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            "Add To Grocery Store"
          )}
        </button>
      </form>
    </div>
  </main>
</div>
  );
}

export default Additems;
