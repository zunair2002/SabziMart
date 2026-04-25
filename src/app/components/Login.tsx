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
 const loginhandler = async (e: React.FormEvent) => {
  e.preventDefault();
  setloading(true);

  try {
    const res = await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirect: false, 
    });

    console.log("NextAuth Response:", res);

    if (res?.error) {
      console.log("Config/Auth Error:", res.error);
      setloading(false);
      return;
    }
    if (res?.ok) {
      window.location.href = "/"; 
    }
  } catch (error) {
    console.log("Frontend Error:", error);
  } finally {
    setloading(false);
  }
};
  return (
    <div className="h-screen font-sans flex items-center justify-center bg-white">

  <h1 className="absolute top-10 text-3xl md:text-4xl font-black text-gray-900 tracking-tight mt-5">
    Sabzi<span className="text-yellow-500"> Mart</span>
  </h1>

  <div className="w-full max-w-sm p-8 rounded-2xl shadow-xl bg-white border border-gray-100">

    <h2 className="text-[18px] font-bold text-center text-gray-900">
      Welcome Back!
    </h2>

    <div className="flex items-center justify-center gap-1 mt-1 mb-6">
          <Leaf size={12} className="text-yellow-500" />
          <p className="text-sm text-gray-400">connect with us</p>
        </div>

    <form onSubmit={loginhandler}>

      <div className="space-y-4">

        <div className="flex items-center border border-gray-200 rounded-lg px-3 transition focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-200">
          <Mail className="text-gray-400" size={16} />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-gray-200 rounded-lg px-3 transition focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-200">
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

        {(() => {
          const isValid = email !== "" && password !== "";
          const validation = isValid && !loading;

          return (
            <button
              disabled={!validation}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex justify-center items-center gap-2 ${
                validation
                  ? "bg-gray-900 text-white hover:bg-black"
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

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-3 text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <div
        className="w-full border border-gray-200 bg-white py-2.5 rounded-lg flex items-center justify-center cursor-pointer gap-2 hover:bg-gray-50 transition"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-4 h-4"
        />
        <span className="text-sm font-medium text-gray-700">
          Continue with Google
        </span>
      </div>

      <p
        className="text-sm text-gray-500 flex items-center justify-center mt-4 gap-1 cursor-pointer"
        onClick={() => router.push('/register')}
      >
        want to create an account?
        <span className="text-yellow-500 font-semibold">Sign up</span>
        <LogIn className="text-yellow-500" size={14} />
      </p>

    </form>

  </div>

</div>
  );
}

export default LoginForm;
