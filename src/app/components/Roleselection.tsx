'use client'
import axios from 'axios';
import { Bike, Contact, User, UserCog } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Roleselection() {
  // array may roles set kr lyty
  const [role,setrole] = useState([
    {id:'admin',label:'Admin',icon:UserCog},
    {id:'user',label:'User',icon:User},
    {id:'rider',label:'Rider',icon:Bike}
  ])
  const [selectedrole,setselectedrole]=useState('');
  const [mobile,setmobile]=useState('');
  const {update} = useSession();

  const router = useRouter();

  const edithandler = async()=>{
    try{
      const data = await axios.post('api/user/roleselect',{mobile,role:selectedrole})
      await update({role:selectedrole})
      router.push('/');
    }catch(error){
      console.log('error in updation frontend');
    }
  }
  return (
  <div className="min-h-screen bg-[#fdfdfd] font-sans flex items-center justify-center px-6 py-12">
  <div className="w-full max-w-lg text-center space-y-10">
        <div className="space-y-2">
<h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-3xl md:text-4xl text-center font-black text-gray-900 tracking-tight mt-5">
    Sabzi<span className="text-yellow-500"> Mart</span>
  </h1>
      <div className="flex items-center justify-center gap-2">
        <span className="h-[1px] w-8 bg-gray-200"></span>
        <p className="text-[8px] font-black uppercase text-gray-400">
          Premium Quality
        </p>
        <span className="h-[1px] w-8 bg-gray-200"></span>
      </div>
    </div>
    <div className="space-y-1">
      <h2 className="text-xl font-black text-gray-900 uppercase">
        Select Your Identity
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {role.map((i) => {
        const Icon = i.icon
        const selection = selectedrole === i.id

        return (
          <div
            key={i.id}
            onClick={() => setselectedrole(i.id)}
            className={`flex flex-col items-center justify-center gap-4 p-8 rounded-xl border transition-all duration-500 cursor-pointer group
              ${
                selection
                  ? "bg-yellow-50 border-yellow-500 shadow-2xl shadow-yellow-100/50 scale-105"
                  : "bg-white border-gray-300 hover:border-yellow-200 hover:bg-gray-50/50"
              }
            `}
          >
            <div className={`p-4 rounded-2xl transition-colors ${selection ? 'bg-yellow-500 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-yellow-500'}`}>
               <Icon size={28} />
            </div>
            <span className={`font-black text-[10px] uppercase tracking-widest ${selection ? 'text-gray-900' : 'text-gray-400'}`}>
              {i.label}
            </span>
          </div>
        )
      })}
    </div>
    <div className="space-y-4 max-w-sm mx-auto">
      <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4 focus-within:border-yellow-500 focus-within:shadow-lg focus-within:shadow-yellow-100/50 transition-all">
        <Contact className="text-gray-400" size={20} />
        <input
          type="tel"
          onChange={(e) => setmobile(e.target.value)}
          placeholder="enter your mobile-no"
          className="w-full outline-none bg-transparent text-xs font-bold placeholder:text-gray-300 text-gray-900"
        />
      </div>
<button
  onClick={edithandler}
  disabled={!selectedrole || mobile.length !== 11}
  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex justify-center items-center gap-2 ${
    selectedrole && mobile.length === 11
      ? "bg-gray-900 text-white hover:bg-black"
      : "bg-gray-100 text-gray-300 cursor-not-allowed"
  }`}
>
  Continue
</button>
    </div>
    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
      Secure access provided by SabziMart Encryption
    </p>

  </div>
</div>
)
}
export default Roleselection
