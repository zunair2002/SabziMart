'use client'
import { AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import Image from 'next/image'

function UserHomepage() {
    const slides = [
       {
  id: 1,
  title: 'Fresh Groceries',
  paragrapgh: 'Healthy, fresh, and just a click away.',
  btnn: 'Explore Now',
  bg: '/gerhard-venter-4LeHpAry1eg-unsplash.jpg'
},
{
  id: 2,
  title: 'Fast Delivery',
  paragrapgh: 'Farm-fresh essentials delivered straight to your doorstep.',
  btnn: 'Explore Now',
  bg: '/gerhard-venter-gVABE-KpYrU-unsplash.jpg'
},
{
  id: 3,
  title: 'Join with us',
  paragrapgh: 'Be part of our fresh journey.',
  btnn: 'Explore Now',
  bg: '/gerhard-venter-mQkeBkBGpSo-unsplash.jpg'
}
    ]
    const[current,setcurrent] = useState(0);
    useEffect(()=>{
        const timer = setInterval(()=>{
            setcurrent((i)=>(i+1)%(slides.length))
        },5000)
        return ()=>clearInterval(timer)
    },[])
  return (
    <div className="w-[95%] h-[80vh] mt-2 flex items-center justify-center rounded-2xl overflow-hidden mx-auto relative">
  <AnimatePresence>
  <motion.div
    key={current}
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 1,
      ease: [0.4, 0, 0.2, 1]
    }}
    className="w-full h-full absolute inset-0"
  >
    <Image
      src={slides[current].bg}
      unoptimized={true}
      fill
      alt="slider"
      priority
      className="object-cover rounded-2xl brightness-40"
    />
     <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white p-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-green-500"
        >
          {slides[current].title}
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm max-w-xl mb-[40px] text-gray-200"
        >
          {slides[current].paragrapgh}
        </motion.p>

        <motion.button 
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-800 transition-all"
        >
          {slides[current].btnn}
        </motion.button>
        <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-1'>
          {slides.map((_,index)=>(
            <button key={index} className={`w-2 h-2 rounded-full transition-all ${index===(current)?'bg-white':'bg-gray-400'}`}/>
          ))}
        </div>
      </div>
  </motion.div>
</AnimatePresence>
</div>
  )
}

export default UserHomepage
