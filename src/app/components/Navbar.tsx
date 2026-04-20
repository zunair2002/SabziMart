"use client";
import {
  Boxes,
  ClipboardCheck,
  LogOut,
  MenuIcon,
  PlusCircle,
  Search,
  ShoppingBasket,
  ShoppingCartIcon,
  User,
  X,
  Heart,
  ChevronDown,
  Ticket,
  Phone,
  Menu,
} from "lucide-react";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Iuser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  image?: string;
  role: "user" | "admin" | "rider";
}

function Navbar({ user }: { user: Iuser }) {
  const [dropdown, setdropdown] = useState(false);
  const [searchbar, setsearchbar] = useState(false);
  const [menu, setmenu] = useState(false);
  const { cartdata } = useSelector((state: RootState) => state.cart);

  const Sidebar = menu
    ? createPortal(
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="fixed top-0 left-0 h-screen w-[70%] sm:w-[50%] bg-white shadow-2xl z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 bg-[#0d4e46]">
                <h1 className="text-md font-bold text-white">Menu</h1>
                <button
                  className="p-2 rounded-full hover:bg-white/20 transition"
                  onClick={() => setmenu(false)}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="flex items-center gap-3 p-4 border-b">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {user.image ? (
                    <Image src={user.image} alt="user" width={40} height={40} className="object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{user.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">{user.role}</span>
                </div>
              </div>

              <div className="flex flex-col p-4 gap-2">
                {user.role === "admin" ? (
                  <>
                    <Link href="/admin/add-items" onClick={() => setmenu(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                      <PlusCircle size={18} /> Add Grocery
                    </Link>
                    <Link href="/admin/get-items" onClick={() => setmenu(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                      <Boxes size={18} /> View Grocery
                    </Link>
                    <Link href="" onClick={() => setmenu(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                      <ClipboardCheck size={18} /> Manage Grocery
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/" onClick={() => setmenu(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Home</Link>
                    <Link href="/shop" onClick={() => setmenu(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Shop</Link>
                    <Link href="/user/myorders" onClick={() => setmenu(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">My Orders</Link>
                  </>
                )}
                <hr className="my-2" />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 font-medium"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <div className="w-full bg-white relative">
      {Sidebar}

      {user.role === "user" ? (
        /* ================= USER NAVBAR (FOODMART STYLE) ================= */
        <div className="w-full">
  <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
    <div className="flex items-center py-5 gap-4 md:gap-8">

     <Link href="/" className="shrink-0">
  <div className="h-10 w-32 md:h-12 md:w-40 flex items-center">
    <h1 className="text-[35px] font-bold">
      Sabzi<span className="text-yellow-400">Mart</span>
    </h1>
  </div>
</Link>

      <div className="flex-1 flex justify-center">
        <div className="hidden lg:flex w-full max-w-2xl">
          <div className="w-full flex items-center bg-[#f3f4f6] rounded-md overflow-hidden border border-transparent focus-within:border-gray-200">
            <input
              type="text"
              placeholder="Search for fresh groceries..."
              className="flex-1 bg-transparent px-4 py-2.5 text-xs outline-none text-gray-700"
            />
            <button className="px-5 text-gray-400 hover:text-black">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative cursor-pointer" onClick={() => setdropdown(!dropdown)}>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition">
              {user.image ? <img src={user.image} className="w-full h-full rounded-full object-cover" /> : <User size={18} className="text-gray-600" />}
            </div>
          </div>

          <div className="hidden sm:flex w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 relative cursor-pointer">
            <Heart size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-[#ffbb38] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
          </div>

          <Link href="/user/cart" className="flex items-center gap-3 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 relative group-hover:bg-[#ffbb38] transition-all">
              <ShoppingCartIcon size={18} className="text-gray-600 group-hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 bg-[#ffbb38] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold px-1 border-2 border-white">
                {cartdata.length}
              </span>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-[10px] text-gray-400 font-bold">Your Cart</p>
              <p className="text-sm font-bold text-gray-800">$1290.00</p>
            </div>
          </Link>

          <button className="md:hidden text-gray-700 p-1" onClick={() => setmenu(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

    </div>
  </div>
</div>
      ) : (
        /* ================= ADMIN NAVBAR (PURANA PILL DESIGN) ================= */
        <div className="w-full pt-3">
          <nav className="w-[95%] backdrop-blur-md px-4 md:px-8 py-2 flex items-center justify-between mx-auto relative z-50 bg-[#0d4e46] shadow-2xl rounded-full">
            <div className="flex items-center">
              <Link href="/">
                <div className="h-[50px] w-[130px] flex items-center">
                  <img src="/logo-removebg-preview.png" alt="Logo" className="h-full w-full object-contain invert brightness-0" />
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link href="/admin/add-items" className="flex items-center gap-1.5 px-3 py-2 bg-white text-[#0d4e46] text-xs font-bold rounded-full shadow-sm hover:bg-gray-100 transition">
                <PlusCircle className="w-4 h-4" /> <span>Add Grocery</span>
              </Link>
              <Link href="/admin/get-items" className="flex items-center gap-1.5 px-3 py-2 bg-white text-[#0d4e46] text-xs font-bold rounded-full shadow-sm hover:bg-gray-100 transition">
                <Boxes className="w-4 h-4" /> <span>View Grocery</span>
              </Link>
              <Link href="" className="flex items-center gap-1.5 px-3 py-2 bg-white text-[#0d4e46] text-xs font-bold rounded-full shadow-sm hover:bg-gray-100 transition">
                <ClipboardCheck className="w-4 h-4" /> <span>Manage Grocery</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="block md:hidden bg-white text-[#147a44] rounded-full p-2 shadow-sm cursor-pointer"
                onClick={() => setmenu(true)}
              >
                <MenuIcon className="w-5 h-5" />
              </div>

              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-white/20 bg-white shadow-lg cursor-pointer"
                  onClick={() => setdropdown(!dropdown)}
                >
                  {user.image ? <Image src={user.image} alt="user" width={40} height={40} className="object-cover" /> : <User className="w-5 h-5 text-gray-700" />}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* DROPDOWN MENU (Common for both roles) */}
      <AnimatePresence>
        {dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute right-4 md:right-10 w-52 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-[999] py-2 mt-2`}
            style={{ top: user.role === 'user' ? '80px' : '75px' }}
          >
            <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border">
                {user.image ? <Image src={user.image} width={40} height={40} alt="user" className="object-cover" /> : <User size={18} />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-[10px] font-bold text-[#147a44] uppercase tracking-wider">{user.role}</p>
              </div>
            </div>

            <div className="p-1">
              {user.role === "user" && (
                <Link href="/user/myorders" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition">
                  <ShoppingBasket size={18} className="text-[#147a44]" /> My Orders
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay for User Role */}
      {searchbar && user.role === "user" && (
        <div className="absolute top-full left-0 w-full bg-white p-4 shadow-xl z-40 border-b md:hidden">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search groceries..." 
              className="w-full bg-gray-100 px-4 py-3 rounded-full outline-none text-sm pr-10" 
            />
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;