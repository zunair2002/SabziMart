'use client'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

function UserHomepage() {
   const slides = [
  {
    id: 1,
    topText: "100% Natural",
    title: <>Fresh Smoothie & <span className="text-yellow-500">Summer Juice</span></>,
    paragraph: 'Healthy, fresh, and just a click away with natural extracts.',
    btnText: 'SHOP NOW',
  },
  {
    id: 2,
    topText: "Organic Farm",
    title: <>Fresh Fruits & <span className="text-yellow-500">Vegetables</span></>,
    paragraph: 'Farm-fresh essentials delivered straight to your doorstep.',
    btnText: 'SHOP NOW',
  }
]

    const [current, setcurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setcurrent((i) => (i + 1) % (slides.length))
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])
    

    return (
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[530px]">

    <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group min-h-[450px]">

      <div className="absolute inset-0 bg-sky-100" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full absolute inset-0"
        >

          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 z-10">

            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-800 font-bold text-sm md:text-lg mb-2"
            >
              {slides[current].topText}
            </motion.span>

            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4 drop-shadow-lg"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-700 text-sm md:text-base mb-8 max-w-md drop-shadow-md"
            >
              {slides[current].paragraph}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <button className="px-8 py-3 bg-white text-gray-900 text-xs font-bold rounded-full hover:bg-gray-300 transition-all shadow-xl">
                {slides[current].btnText}
              </button>
            </motion.div>

          </div>

        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setcurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
              index === current
                ? "bg-gray-400 w-8 scale-110"
                : "bg-white/50 w-3 scale-100"
            }`}
          />
        ))}
      </div>

    </div>

    <div className="lg:col-span-4 flex flex-col gap-5">

      <div className="flex-1 bg-[#eef5e4] rounded-3xl p-8 relative overflow-hidden group min-h-[250px] flex flex-col justify-center">
        <div className="relative z-10">
          <span className="text-green-600 font-bold text-xs uppercase tracking-widest">20% Off Sale</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2 max-w-[180px]">Fruits & Vegetables</h2>
          <button className="mt-6 text-xs font-bold text-gray-700 flex items-center gap-1 group-hover:gap-3 transition-all underline underline-offset-4">
            Shop Category <ChevronRight size={14} />
          </button>
        </div>

        <div className="absolute right-[-80px] w-full h-full group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Image src="/52b946f1-baf1-4384-be55-b60132022a29-removebg-preview.png" alt="Fruits" fill className="object-contain" />
        </div>
      </div>

      <div className="flex-1 bg-[#f9eee4] rounded-3xl p-8 relative overflow-hidden group min-h-[250px] flex flex-col justify-center">
        <div className="relative z-10">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">15% Off Sale</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2 max-w-[180px]">Baked Products</h2>
          <button className="mt-6 text-xs font-bold text-gray-700 flex items-center gap-1 group-hover:gap-3 transition-all underline underline-offset-4">
            Shop Category <ChevronRight size={14} />
          </button>
        </div>

        <div className="absolute right-[-10px] w-[85%] h-full group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Image src="/cebc4be0-aceb-4b25-9a73-2a459fe05db7_removalai_preview.png" alt="Bakery" fill className="object-contain" />
        </div>
      </div>

    </div>

  </div>
</div>
    )
}

export default UserHomepage;