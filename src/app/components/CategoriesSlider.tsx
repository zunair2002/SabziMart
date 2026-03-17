"use client";
import {
  Apple,
  Milk,
  Beef,
  Croissant,
  Coffee,
  Cookie,
  Package,
  Snowflake,
  Home,
  HeartPulse,
  Leaf,
  PawPrint,
  MoreHorizontal,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef } from "react";

function CategoriesSlider() {
  const all_categories = [
    { id: 1, name: "Fruits & Veg", icon: <Apple className="text-green-500" /> },
    { id: 2, name: "Dairy & Eggs", icon: <Milk className="text-blue-400" /> },
    { id: 3, name: "Meat & Fish", icon: <Beef className="text-red-500" /> },
    { id: 4, name: "Bakery", icon: <Croissant className="text-amber-500" /> },
    { id: 5, name: "Drinks", icon: <Coffee className="text-orange-500" /> },
    { id: 6, name: "Snacks", icon: <Cookie className="text-yellow-500" /> },
    { id: 7, name: "Pantry", icon: <Package className="text-indigo-500" /> },
    { id: 8, name: "Frozen", icon: <Snowflake className="text-cyan-400" /> },
    { id: 9, name: "Household", icon: <Home className="text-gray-500" /> },
    {
      id: 10,
      name: "Personal Care",
      icon: <HeartPulse className="text-pink-500" />,
    },
    { id: 11, name: "Organic", icon: <Leaf className="text-emerald-500" /> },
    {
      id: 12,
      name: "Pet Care",
      icon: <PawPrint className="text-orange-400" />,
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -200 : 200;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="mx-auto w-[95%] rounded-xl p-4 mt-5 text-center">
        <div className="mt-1">
          <h2 className="font-semibold text-[35px] text-gray-900 mb-6 text-center inline-block">
            Available Categories
          </h2>
          <div className="flex items-center">
            <button
              className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-orange-600 text-white shadow-md hover:bg-orange-700 transition-colors duration-300 cursor-pointer flex-shrink-0"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={16} className="md:w-5 md:h-5" />
            </button>

            <div
              className="flex gap-1.5 md:gap-3.5 px-1 md:px-2 mx-1.5 md:mx-6 py-1 flex-1 hide_scrolling overflow-x-auto"
              ref={scrollRef}
            >
              {all_categories.map((i) => (
                <div
                  key={i.id}
                  className="min-w-[75px] h-[75px] md:min-w-[130px] md:h-[130px] flex flex-col items-center justify-center border-[0.25px] border-gray-200 bg-white text-black text-[10px] md:text-sm font-medium rounded-lg md:rounded-xl shadow-sm md:shadow-md cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 flex-shrink-0"
                >
                  <div className="scale-[0.65] md:scale-100 mb-0">{i.icon}</div>
                  <span className="mt-0.5 md:mt-2 text-center px-1 leading-tight line-clamp-1">
                    {i.name}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-orange-600 text-white shadow-md hover:bg-orange-700 transition-colors duration-300 cursor-pointer flex-shrink-0"
              onClick={() => scroll("right")}
            >
              <ChevronRight size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesSlider;
