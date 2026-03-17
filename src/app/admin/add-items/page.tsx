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
    <>
    <div className="min-h-dvh flex flex-col">
      <Link
        href="/"
        className="fixed top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1F3D2B] text-white text-sm font-medium shadow-md hover:bg-[#3E7C59] hover:text-white cursor-pointer transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>

      <main className="flex-1 flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="flex items-center justify-center gap-2 text-[20px] font-bold text-[#31F3D2B] mb-2">
            <PlusCircle className="w-5 h-5" />
            <span>Grocery List</span>
          </h1>

          <span className="flex items-center justify-center text-[10px] mb-4">
            Fill out the details below to add new grocery items
          </span>

          <form className="space-y-4" onSubmit={handle_save_records}>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Grocery Name<span className="text-red-600 pl-1">*</span>
              </label>
              <input
                type="text"
                placeholder="eg. milk"
                onChange={(e) => setname(e.target.value)}
                value={name}
                className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Category<span className="text-red-600 pl-1">*</span>
                </label>
                <select
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
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

              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Unit<span className="text-red-600 pl-1">*</span>
                </label>
                <select
                  className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
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
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Price <span className="text-red-600 pl-1">*</span>
              </label>
              <input
                type="number"
                placeholder="eg. 130"
                onChange={(e) => setprice(e.target.value)}
                value={price}
                className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <label
                htmlFor="imageUpload"
                className="flex items-center gap-2 cursor-pointer rounded-md border border-green-300 bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800 shadow-sm hover:bg-green-200"
              >
                <Upload className="w-4 h-4" />
                <span>Upload image</span>
              </label>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handle_gerocery_image}
                className="hidden"
              />

              {frontend_image && (
                <div className="w-[100px] h-[100px] flex-shrink-0 rounded-[5px] border border-green-300 shadow-md overflow-hidden">
                  <Image
                    src={frontend_image}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-sm flex items-center justify-center rounded-md bg-[#1F3D2B] text-white font-medium hover:bg-[#3E7C59] cursor-pointer transition"
            >
               {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5" />
        </>
      ) : (
        "Add Gerocery"
      )}
            </button>
          </form>
        </div>
      </main>
    </div>
    </>
  );
}

export default Additems;
