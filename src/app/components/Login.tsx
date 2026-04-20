import axios from "axios";
import {
  Mail,
  Lock,
  Leaf,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
} from "lucide-react";
import Credentials from "next-auth/providers/credentials";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginForm() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const [loading, setloading] = useState(false);

  //hook for navigation
  const router = useRouter();
  const session = useSession();
  const loginhandler = async(e:React.FormEvent)=>{
    try{
        e.preventDefault();
        setloading(true);

    //sign in through NextAuth
        await signIn("credentials",{email,password,redirect:false})
        router.push('/');
        setloading(false);
        
    }catch(error){
        console.log('error in login frontend')
        setloading(false);
    }
  }
  return (
    <div className="h-screen font-sans flex items-center justify-center bg-[#F1F3F4]">

  <div className="w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white border border-gray-100">

    <h2 className="text-[28px] font-bold text-center text-[#0d4e46]">
      Welcome Back!
    </h2>

    <div className="flex items-center justify-center gap-1 mt-1 mb-6">
      <Leaf size={12} className="text-[#0d4e46]" />
      <p className="text-sm text-gray-400">connect with us</p>
    </div>

    <form onSubmit={loginhandler}>

      <div className="space-y-4">

        {/* Email */}
        <div className="flex items-center border border-gray-200 rounded-lg px-3 transition focus-within:border-[#0d4e46] focus-within:ring-1 focus-within:ring-[#0d4e46]/20">
          <Mail className="text-gray-400" size={16} />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-200 rounded-lg px-3 transition focus-within:border-[#0d4e46] focus-within:ring-1 focus-within:ring-[#0d4e46]/20">
          <Lock className="text-gray-400" size={16} />

          <input
            type={showpass ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            onChange={(e) => setpassword(e.target.value)}
          />

          {showpass ? (
            <EyeOff
              className="text-gray-400 cursor-pointer"
              onClick={() => setshowpass(false)}
              size={16}
            />
          ) : (
            <Eye
              className="text-gray-400 cursor-pointer"
              onClick={() => setshowpass(true)}
              size={16}
            />
          )}
        </div>

        {/* Button */}
        {(() => {
          const isValid = email !== "" && password !== "";
          const validation = isValid && !loading;

          return (
            <button
              disabled={!validation}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex justify-center items-center gap-2 ${
                validation
                  ? "bg-[#0d4e46] text-white hover:bg-[#083631]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          );
        })()}

      </div>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-3 text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      {/* Google */}
      <div
        className="w-full border border-gray-200 bg-[#0d4e46] py-2.5 rounded-lg flex items-center justify-center cursor-pointer gap-2 hover:bg-[#083631] transition"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-4 h-4"
        />
        <span className="text-sm font-medium text-white">
          Continue with Google
        </span>
      </div>

      {/* Signup */}
      <p
        className="text-sm text-gray-500 flex items-center justify-center mt-4 gap-1 cursor-pointer"
        onClick={() => router.push('/register')}
      >
        want to create an account?
        <span className="text-[#0d4e46] font-semibold">Sign up</span>
        <LogIn className="text-[#0d4e46]" size={14} />
      </p>

    </form>

  </div>

</div>
  );
}

export default LoginForm;
