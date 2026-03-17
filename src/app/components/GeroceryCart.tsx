import { Plus } from 'lucide-react';
import mongoose from 'mongoose';
import Image from 'next/image';
import React from 'react'
interface Igerocery {
  id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
}

function GeroceryCart({i}:{i:Igerocery}) {
  return (
    <>
<div className="bg-[#F8F9FA] rounded-lg sm:rounded-2xl p-1.5 sm:p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative border border-transparent hover:border-gray-200">
    <div className="flex justify-center items-center aspect-square mb-1 sm:mb-3 overflow-hidden">
    <Image
      src={i.image}
      alt={i.name}
      width={80}
      height={80}
      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
    />
  </div>
  <div className="flex flex-col text-left">
  <div className="flex flex-col mt-2">
  <h1 className="text-[10px] sm:text-xs md:text-sm font-semibold font-sans text-gray-500 mb-1">
    {i.category}
  </h1>
  <h3 className="text-sm sm:text-base md:text-lg font-semibold font-sans text-gray-800 mb-2">
    {i.name}
  </h3>
</div>

<span className="text-[10px] font-bold text-gray-600 bg-gray-200 rounded-full px-3 py-[2.5px] w-fit">
  {i.unit}
</span>

    <div className="flex items-center justify-between mt-1">
      <span className="text-[10px] sm:text-lg font-bold font-sans text-gray-800">
        Rs {i.price}
      </span>
      <button className="group/btn w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-orange-600 text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm">
        <Plus 
          size={14} 
          className="sm:w-4 sm:h-4 transition-transform duration-500 group-hover/btn:rotate-90 hover:cursor-pointer" 
          strokeWidth={4} 
        />
      </button>
    </div>
  </div>
</div>
    </>
  )
}

export default GeroceryCart
