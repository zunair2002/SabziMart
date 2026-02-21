"use client";
import {
  Boxes,
  ClipboardCheck,
  FastForward,
  LogOut,
  MenuIcon,
  PlusCircle,
  Search,
  ShoppingBasket,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";

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

  const Sidebar = menu
    ? createPortal(
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="fixed top-0 left-0 h-screen w-[50%] md:w-[70%]
                         bg-gradient-to-b from-green-900 to-green-600
                         shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 bg-green-700">
                <h1 className="text-lg font-bold text-white">Admin Panel</h1>

                <button
                  className="p-2 rounded-full hover:bg-green-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setmenu(false);
                  }}
                >
                  <X className="w-5 h-5 text-white hover: pointer-cursor transition"/>
                </button>
              </div>
              <div className="flex items-center gap-3 mt-5 bg-white/20 p-3 w-[90%] mx-auto rounded-lg">
  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
    {user.image ? (
      <Image
        src={user.image}
        alt="user"
        width={35}
        height={35}
        className="object-cover w-full h-full"
      />
    ) : (
      <User className="w-4 h-4 text-gray-600" />
    )}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-sm text-white mb-1">
            {user.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[90%] mx-auto mt-8">
  <Link
                  href=""
                  className="flex items-center gap-3 mt-1 bg-white/20 p-3 w-[100%] mx-auto rounded-lg text-white"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Grocery</span>
                </Link>

                <Link
                  href=""
                  className="flex items-center gap-3 mt-1 bg-white/20 p-3 w-[100%] mx-auto rounded-lg text-white"
                >
                  <Boxes className="w-4 h-4" />
                  <span>View Grocery</span>
                </Link>

                <Link
                  href=""
                  className="flex items-center gap-3 mt-1 bg-white/20 p-3 w-[100%] mx-auto rounded-lg text-white"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Manage Grocery</span>
                </Link>
<hr className="text-white/30 mt-4"/>
<div
                  className="flex items-center gap-3 mt-75 bg-white/20 p-3 w-[100%] mx-auto rounded-lg text-red-600 hover:bg-red-200 transition"
                  onClick={async ()=> await signOut({ callbackUrl: "/" })}>
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Logout</span>
                </div>
</div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <div className="w-full">
      <nav className="w-full bg-green-700 shadow-md px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        <div className="flex items-center">
          <Link
            href="/"
            className="font-mono font-bold text-lg md:text-xl text-white"
          >
            SabziMart
          </Link>
        </div>

        <div className="hidden sm:flex flex-1 justify-center px-4">
          {user.role === "user" && (
            <form className="flex items-center bg-white rounded-full p-1 sm:px-2 sm:py-1.5 border border-gray-200 transition-all duration-300 w-full max-w-xs md:max-w-md">
              <Search size={18} className="text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 w-full outline-none text-sm bg-transparent text-gray-700 transition-all duration-300"
              />
            </form>
          )}
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          {user.role === "user" && (
            <>
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
            </>
          )}

          {user.role === "admin" && (
            <>
              <div className="hidden md:flex gap-2">
                <Link
                  href=""
                  className="flex items-center gap-1.5 px-2.5 py-2 bg-white text-green-800 text-xs font-bold rounded-full shadow-sm hover:bg-green-200 transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Grocery</span>
                </Link>

                <Link
                  href=""
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-green-800 text-xs font-bold rounded-full shadow-sm hover:bg-green-200 transition"
                >
                  <Boxes className="w-4 h-4" />
                  <span>View Grocery</span>
                </Link>

                <Link
                  href=""
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-green-800 text-xs font-bold rounded-full shadow-sm hover:bg-green-200 transition"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Manage Grocery</span>
                </Link>
              </div>
              <div
                className="block md:hidden mr-3 bg-white text-green-800 rounded-full p-[9px] shadow-sm"
                onClick={() => setmenu((prev) => !prev)}
              >
                <MenuIcon className="w-4 h-4 text-green-800" />
                {Sidebar}
              </div>
            </>
          )}

          <div className="relative inline-block">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
              onClick={() => setdropdown((i) => !i)}
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
            <AnimatePresence>
              {dropdown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-md bg-gray-100 shadow-xl border border-gray-200 z-[9999]"
                >
                  <div className="px-4 py-2 rounded-md flex items-center gap-3">
                    <div className="w-9 h-9 mt-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt="user"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <User className="w-4 h-4 text-gray-700" />
                      )}
                    </div>
                    <div className="min-w-0 leading-tight">
                      <p className="text-medium font-semibold text-gray-900 truncate mb-1">
                        {user.name}
                      </p>
                      <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wide truncate">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <hr className="my-1 border-gray-200" />

                  {user.role === "user" && (
                    <Link
                      href="#"
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-green-200 rounded-md cursor-pointer flex items-center gap-2 font-sans"
                    >
                      <ShoppingBasket className="w-5 h-5 text-green-700" />
                      <span>My Orders</span>
                    </Link>
                  )}

                  <div
                    className="px-4 py-3 text-sm text-gray-700 hover:bg-red-100 rounded-md cursor-pointer flex items-center gap-2 font-sans"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span>Logout</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
  );
}

export default Navbar;
