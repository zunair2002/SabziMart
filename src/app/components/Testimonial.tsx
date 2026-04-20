import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import React from "react";

function Testimonial() {
  return (
<div className="w-full min-h-screen bg-gradient-to-b from-white via-[#f8fbff] to-[#f9eee4] flex items-center justify-center py-12 px-6 md:px-12 lg:px-24 rounded-3xl ">
<div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative w-full h-[450px] md:h-[600px] flex items-end justify-center">
          <div className="absolute bottom-0 w-[85%] h-[85%] bg-gradient-to-t from-[#F8F1EA] to-[#f8fbff] rounded-t-full -z-0"></div>

          <div className="relative z-10 w-full h-full flex items-center justify-center">
           <img src="/4fecb71b-ed0d-4b80-8e76-119cdeda68e7_removalai_preview.png" alt="Delivery Man" className="h-[70%] object-contain" /> 
          </div>

          <div className="absolute top-20 right-4 md:right-10 z-20 bg-white p-3 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-50">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
              🍓
            </div>
          </div>
          <div className="absolute bottom-20 left-4 md:left-0 z-20 bg-white p-3 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-50">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
              🍊
            </div>
          </div>
          <div className="absolute bottom-10 right-0 z-30 bg-white p-4 rounded-2xl shadow-2xl shadow-gray-300/40 border border-gray-50 min-w-[180px]">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                This Month Sale
              </p>
              <div className="bg-green-100 p-1 rounded-md">
                <ArrowRight size={14} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#1A2E35]">Rs 60,000</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-green-500"></div>
              </div>
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-bold text-green-500">
                +2.35%
              </span>
            </div>
          </div>
          <div className="absolute top-1/2 -right-4 opacity-20 hidden md:block">
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            >
              <path d="M10 50 Q 50 10 90 50" />
            </svg>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A2E35] leading-[1.1]">
              Best Quality Healthy & <br />
              <span className="text-[#ffbb38]">Fresh Grocery</span>
            </h1>
            <p className="text-gray-500 text-md leading-relaxed max-w-lg font-medium">
              We prioritize quality in each of our grocery, below are the
              advantage of our products Organic food is food produced.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-green-500"
                size={24}
                fill="#e8f7ee"
              />
              <span className="font-bold text-[#1A2E35] text-sm md:text-base whitespace-nowrap">
                Best Services than others
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-green-500"
                size={24}
                fill="#e8f7ee"
              />
              <span className="font-bold text-[#1A2E35] text-sm md:text-base whitespace-nowrap">
                100% organic vegetables
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-green-500"
                size={24}
                fill="#e8f7ee"
              />
              <span className="font-bold text-[#1A2E35] text-sm md:text-base whitespace-nowrap">
                100% Returns & Refunds
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-green-500"
                size={24}
                fill="#e8f7ee"
              />
              <span className="font-bold text-[#1A2E35] text-sm md:text-base whitespace-nowrap">
                User-Friendly Mobile Apps
              </span>
            </div>
          </div>
          <div className="pt-4">
            <button className="px-8 py-3 bg-white text-gray-900 text-xs font-bold rounded-full hover:bg-gray-300 hover:cursor-pointertransition-all shadow-xl">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
