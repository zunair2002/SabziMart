"use client"
import React from 'react'
import { motion } from "motion/react"
type proptype={
  nextstep:(n:number)=> void
}
function Welcome({nextstep}:proptype) {
  return (
    <div className="h-screen bg-gradient-to-b from-green-200 via-green-100 to-white font-sans flex items-center justify-center">
  <section className="text-center px-4 mt-1">
    <p className="text-[8px] tracking-widest text-green-700">
      PRESENT YOUR SERVICE
    </p>

    <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-green-900">
      SabziMart
    </h1>

    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
  We focus on providing quality products at affordable prices making shopping easy and convenient for everyone. 
</p>
    <div className="flex justify-center mt-[50px]">
      <button className="bg-green-900 text-white px-6 py-2 rounded-md cursor-pointer text-sm hover:bg-green-700 transition shadow-md" onClick={()=>nextstep(2)}>
        Get started
      </button>
    </div>

    <p className="text-xs text-gray-500 mt-3">
      Trusted by over 10,000+ customers
    </p>
  </section>
</div>

  )
}

export default Welcome
