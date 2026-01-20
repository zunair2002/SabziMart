import axios from "axios";
import {
  ArrowLeft,
  Mail,
  User,
  Lock,
  Leaf,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
type proptype = {
  prevstep: (n: number) => void;
};
function RegisterForm({ prevstep }: proptype) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const [loading, setloading] = useState(false);

  //hooks for navigation
  const router = useRouter();

  const registerhandler = async(e:React.FormEvent)=>{
    try{
        e.preventDefault();
        setloading(true);
        const data = await axios.post('api/auth/register',{name,email,password})
        router.push('/login');
        setloading(false);
        
    }catch(error){
        console.log('error in registeration frontend')
        setloading(false);
    }
  }
  return (
    <div className="h-screen bg-gradient-to-b from-green-100 via-green-50 to-white font-sans relative">
      <div
        className="absolute top-6 left-6 flex items-center gap-1 cursor-pointer text-green-600"
        onClick={() => {
          prevstep(1);
        }}
      >
        <ArrowLeft size={15} />
        <span className="font-medium mb-[2px]">Back</span>
      </div>

      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-sm p-6">
          <h2 className="text-[30px] font-bold text-center text-green-600">
            Create An Account
          </h2>

          <div className="flex items-center justify-center gap-1 mt-1 mb-6">
            <Leaf size={12} className="text-green-700 mt-1" />
            <p className="text-sm text-gray-400">connect with us</p>
          </div>
          <form onSubmit={registerhandler}>
          <div className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-[8px] px-3 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-600">
              <User className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-[8px] px-3 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-600">
              <Mail className="text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-[8px] px-3 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-600">
              <Lock className="text-gray-400" size={18} />

              <input
                type={showpass ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                onChange={(e) => setpassword(e.target.value)}
              />
              {showpass ? (
                <EyeOff
                  className="text-gray-400 -mt-1 cursor-pointer"
                  onClick={() => setshowpass(false)}
                  size={18}
                />
              ) : (
                <Eye
                  className="text-gray-400 -mt-1 cursor-pointer"
                  onClick={() => setshowpass(true)}
                  size={18}
                />
              )}
            </div>

{(() => {
  const isValid = name !== "" && email !== "" && password !== "";
  const validation = isValid && !loading;

  return (
    <button
      disabled={!validation}
      className={`w-full py-2 rounded-[8px] font-medium transition flex justify-center items-center gap-2 ${
        validation
          ? "bg-green-700 text-white hover:bg-green-600 cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5" />
          Loading...
        </>
      ) : (
        "Create Account"
      )}
    </button>
  );
})()}
          </div>
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="w-full border border-gray-300 py-2 rounded-[8px] flex items-center justify-center cursor-pointer gap-2 hover:bg-gray-50 transition" onClick={()=>signIn('google',{callbackUrl:'/'})}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-500">
              Continue with Google
            </span>
          </div>
          <p className="text-sm text-gray-500 gap-1 flex items-center justify-center mt-3 cursor-pointer" onClick={()=>router.push('/login')}>
            Already have an account?
            <LogIn className="text-green-600 mt-[1px]" size={15} />
            <span className="text-green-600">Sign in</span>
          </p>
      </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
