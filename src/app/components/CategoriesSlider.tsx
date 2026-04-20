"use client";
import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Apple,
  Coffee,
  Fish,
  Beef,
  Milk,
  Cookie,
} from "lucide-react";

function CategoriesSlider() {
  const all_categories = [
    {
      id: 1,
      name: "Fruits",
      icon: <Apple />,
      color: "bg-[#fce4ec]",
      text: "text-[#c2185b]",
    },
    {
      id: 2,
      name: "Coffee",
      icon: <Coffee />,
      color: "bg-[#fdf2e9]",
      text: "text-[#a0522d]",
    },
    {
      id: 3,
      name: "Fish",
      icon: <Fish />,
      color: "bg-[#e3f2fd]",
      text: "text-[#0277bd]",
    },
    {
      id: 4,
      name: "Meat",
      icon: <Beef />,
      color: "bg-[#fce4ec]",
      text: "text-[#c2185b]",
    },
    {
      id: 5,
      name: "Milk",
      icon: <Milk />,
      color: "bg-[#e3f2fd]",
      text: "text-[#0277bd]",
    },
    {
      id: 6,
      name: "Bakery",
      icon: <Cookie />,
      color: "bg-[#fff8e1]",
      text: "text-[#fbc02d]",
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase">
              SHOP BY <span className="text-[#ffbb38]">CATEGORY</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-[#ffbb38] text-white shadow-sm hover:bg-[#eab308] transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 md:gap-6 pb-10 hide_scrolling overflow-x-auto scroll-smooth"
          ref={scrollRef}
        >
          {all_categories.map((i) => (
            <div
              key={i.id}
              className={`min-w-[260px] rounded-3xl md:min-w-[320px] ${i.color} p-7 md:p-8 flex items-center justify-between relative overflow-hidden group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="w-[60%] z-10 flex flex-col gap-2">
                <h3
                  className={`font-black text-xl md:text-2xl ${i.text} leading-tight`}
                >
                  {i.name}
                </h3>
                <p className="text-[10px] md:text-[11px] text-gray-500 font-bold leading-tight max-w-[130px] opacity-70">
                  Fresh arrivals and premium {i.name} collection.
                </p>
                <button className="mt-4 w-fit bg-white text-gray-900 text-[9px] md:text-[10px] font-extrabold px-5 py-2 rounded-full shadow-sm hover:bg-gray-900 hover:text-white transition-all uppercase tracking-wider">
                  View All
                </button>
              </div>

              <div className="relative w-[35%] h-full flex items-center justify-end">
                <div
                  className={`${i.text} opacity-10 absolute -right-4 -bottom-4 scale-[4] md:scale-[5] rotate-35`}
                >
                  {i.icon}
                </div>

                <div
                  className={`${i.text} mb-5 scale-[2.5] md:scale-[3.5] drop-shadow-2xl transition-transform duration-500 group-hover:scale-[3.8]`}
                >
                  {i.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesSlider;
