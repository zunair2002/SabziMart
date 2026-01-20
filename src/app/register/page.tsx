"use client"
import React, { useState } from 'react'
import Welcome from '../components/Welcome'
import RegisterForm from '../components/RegisterForm';

function page() {
  const[step,setstep]=useState(1);
  return (
    <div>
      {step==1 ? <Welcome nextstep={setstep}/>:<RegisterForm prevstep={setstep}/>}
    </div>
  )
}

export default page
