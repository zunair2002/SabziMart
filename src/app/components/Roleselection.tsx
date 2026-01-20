'use client'
import axios from 'axios';
import { Bike, Contact, User, UserCog } from 'lucide-react'
import { redirect } from 'next/navigation';
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

  const edithandler = async()=>{
    try{
      const data = await axios.post('api/user/roleselect',{mobile,role:selectedrole})
      redirect('/');
    }catch(error){
      console.log('error in updation frontend');
    }
  }
  return (
  <div className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-white font-sans flex items-center justify-center px-4">
    <div className="w-full max-w-lg text-center space-y-8">
      <h1 className="text-[26px] sm:text-[30px] font-bold text-green-700">
        Please select your role
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {role.map((i) => {
          const Icon = i.icon
          const selection = selectedrole === i.id

          return (
            <div
              key={i.id}
              onClick={() => setselectedrole(i.id)}
              className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl border cursor-pointer transition
                ${
                  selection
                    ? "bg-green-200 text-black border-green-600"
                    : "bg-white text-black border-gray-200"
                }
              `}
            >
              <Icon className="text-3xl sm:text-4xl" />
              <span className="font-medium text-base sm:text-sm">
                {i.label}
              </span>
            </div>
          )
        })}
      </div>
     <div className="flex items-center gap-2 border border-gray-300 rounded-[8px] px-3 py-2 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-600">
      <Contact className="text-gray-400 mt-[2px]" size={16} />
      <input
        type="tel"
        onChange={(e)=>setmobile(e.target.value)}
        placeholder="Enter mobile number"
        className="w-full outline-none bg-transparent text-sm"
      />
    </div>
     <button
      onClick={edithandler}
      disabled={!selectedrole || mobile.length !== 11}
      className={`w-[100px] py-2 rounded-full text-[12px]
        ${
          selectedrole && mobile.length === 11
            ? "bg-green-700 text-white hover:bg-green-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }
      `}
    >
  Continue
</button>

    </div>
  </div>
)
}
export default Roleselection
