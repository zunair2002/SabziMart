import { Facebook, Instagram, Star, TwitterIcon } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-white pt-20 pb-12 border-t border-gray-100">
  <div className="max-w-[1400px] mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-16 items-start">

      {/* LEFT SIDE */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-start mt-8">

        <div className="col-span-2 space-y-6">
          <a href="/" className="text-xl font-bold text-[#333]">
            Sabzi<span className="text-[#ffbb38]"> Mart</span>
          </a>

          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full hover:bg-gray-50">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-gray-50">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-gray-50">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-[#767676]">
            Copyright © 2026 by Sabzi Mart
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-sm text-gray-600">
            E food mart for avalaible 24/7
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Account</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Sign in</li>
            <li>Create account</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>

      </div>

      {/* RIGHT SIDE FORM */}
      <div className="bg-gray-50 p-8 rounded-3xl self-start">

        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Feedback of our services
        </h3>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
        />

        <textarea
          rows={4}
          placeholder="Write your review..."
          className="w-full mb-6 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
        />

        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              className="cursor-pointer text-gray-300 hover:text-yellow-400 transition"
            />
          ))}
        </div>

        <button className="w-full bg-[#ffbb38] text-white py-3 rounded-lg font-semibold hover:bg-[#cf711f] transition">
          Submit Review
        </button>

      </div>

    </div>
  </div>
</footer>
  )
}

export default Footer
