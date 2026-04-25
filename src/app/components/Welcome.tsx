"use client"
import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { getsocket } from '@/config/socketio'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
type proptype={
  nextstep:(n:number)=> void
}
function Welcome({nextstep}:proptype) {
  return (
  <div className="relative min-h-screen w-full bg-[#fdfdfd] font-sans overflow-hidden flex flex-col">

  <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-300 rounded-full blur-[100px] opacity-40 -z-10" />
  <div className="absolute -bottom-24 left-10 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[120px] opacity-30 -z-10" />
  <div className="absolute top-10 right-10 w-64 h-64 bg-orange-200 rounded-full blur-[90px] opacity-20 -z-10" />

  <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">

    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider mb-10">
          #1 PRESENT YOUR SERVICE
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase">
          Sabzi<br />
          <span className="ml-[20%] text-yellow-500">Mart</span>
        </h1>
      </div>

      <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
        We focus on providing quality products at affordable prices making shopping easy and convenient for everyone.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
        <Link
          onClick={() => nextstep(2)}
          href={'/register'}
className="bg-yellow-400 text-white px-12 py-4 font-bold text-xs uppercase rounded-full tracking-[0.2em] shadow-2xl shadow-yellow-200/50 hover:bg-yellow-500 transition-all active:scale-95"
>
          Get started
        </Link>

        <div className="border-l border-gray-200 pl-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Trust</p>
          <p className="text-xs font-bold text-gray-500">10,000+ Happy Customers</p>
        </div>
      </div>
    </div>

  <div className="hidden lg:flex items-center justify-center h-full overflow-hidden">
  <img
    src="/image.png"
    alt="SabziMart"
    className="max-h-[100vh] w-auto object-contain"
  />
</div>

  </div>
</div>
  )
}

export default Welcome
