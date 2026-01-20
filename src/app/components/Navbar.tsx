'use client'
import { LogOut, Search, ShoppingBasket, ShoppingCartIcon, User } from 'lucide-react'
import mongoose from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {motion} from 'motion/react'


interface Iuser {
  _id?: mongoose.Types.ObjectId
  name: string,
  email: string,
  password?: string,
  mobile?: string,
  image?: string,
  role: "user" | "admin" | "rider"
}

function Navbar({ user }: { user: Iuser }) {
  const [dropdown, setdropdown] = useState(false);
  const [searchbar, setsearchbar] = useState(false);

  return (
    <div className="w-full">
      <nav className="w-full bg-green-700 shadow-md px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        <div className="flex items-center">
          <Link href="/" className="font-mono font-bold text-lg md:text-xl text-white">
            SabziMart
          </Link>
        </div>

        <div className="hidden sm:flex flex-1 justify-center px-4">
          <form className="flex items-center bg-white rounded-full p-1 sm:px-2 sm:py-1.5 border border-gray-200 transition-all duration-300 w-full max-w-xs md:max-w-md">
            <Search size={18} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full outline-none text-sm bg-transparent text-gray-700 transition-all duration-300"
            />
          </form>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            type="button"
            onClick={() => setsearchbar(!searchbar)}
            className="sm:hidden flex items-center justify-center w-8 h-8 bg-white rounded-full border border-gray-200"
          >
            <Search size={15} className="text-gray-500 shrink-0" />
          </button>

          <Link href="#" className="relative inline-block">
            <ShoppingCartIcon className="w-6 h-6 text-white" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>

          <div className="relative inline-block">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
              onClick={() => setdropdown(i => !i)}
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt="user"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-700" />
              )}
            </div>

            {dropdown && (
              <motion.div 
              initial={{opacity: 0 }}
              animate={{opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute right-0 top-full mt-2 w-48 rounded-md bg-gray-100 shadow-xl border border-gray-200 z-[9999]">
                <div className="px-4 py-2 rounded-md flex items-center gap-3">
                  <div className="w-8 h-8">
                    <Image
                      src={user.image || '/avatar-default.svg'}
                      alt="user"
                      width={25}
                      height={25}
                      className="object-cover mt-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-[9px] text-gray-500 truncate mb-1">
                      {user.email}
                    </p>
                  </div>
                </div>
                <hr className="my-1" />
                <Link href={'#'} className="px-4 py-3 text-sm text-gray-700 hover:bg-green-200 rounded-md cursor-pointer flex items-center gap-2 font-sans ">
                  <ShoppingBasket className="w-6 h-6 text-green-700" />
                  <span>My Orders</span>
                </Link>
                <div className="px-4 py-3 text-sm text-gray-700 hover:bg-red-100 rounded-md cursor-pointer flex items-center gap-2 font-sans ">
                  <LogOut className="w-6 h-6 text-red-600" />
                  <span>Logout</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {searchbar && (
        <div className="sm:hidden w-full p-2 animate-in slide-in-from-top duration-300">
          <form className="flex items-center bg-white rounded-full px-4 py-2 w-full border border-gray-500">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white outline-none ml-2 text-sm text-gray-700"
              autoFocus
            />
            <button 
              type="button" 
              onClick={() => setsearchbar(false)}
              className="ml-2 text-gray-400 text-xl"
            >
              x
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Navbar