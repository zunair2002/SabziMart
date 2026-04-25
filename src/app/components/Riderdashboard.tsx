import React from 'react'

function Riderdashboard() {
  return (
       <div className="min-h-screen rounded-xl bg-white text-gray-900">

      <section className="text-center px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Deliver Fast <span className="text-yellow-500">Earn More</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Join our rider network and start earning with flexible hours and real-time orders near you.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-semibold text-lg hover:bg-yellow-500 transition shadow-lg">
            Start Delivering
          </button>
          <button className="border border-gray-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>
       <section className="grid sm:grid-cols-3 gap-6 px-30 max-w-6xl mx-auto mb-16">
        {[
          {
            title: "Flexible Hours",
            desc: "Work whenever you want full time or part time.",
          },
          {
            title: "Instant Earnings",
            desc: "Get paid quickly and track your earnings in time.",
          },
          {
            title: "Smart Routing",
            desc: "Optimized routes to save time and fuel.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-gradient-to-r from-yellow-100/30 to-yellow-100/30 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl p-12 text-center"
          >
            <h3 className="text-gray-900 text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="px-6 max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
          How It Works
        </h2>

       <div className="grid sm:grid-cols-3 gap-8 text-center relative">
  {["Go Online", "Accept Orders", "Deliver & Earn"].map((step, i) => (
    <div key={step} className="relative flex flex-col items-center">
            {i !== 2 && (
        <div className="hidden sm:block absolute top-6 left-1/2 w-full h-[2px] bg-gray-300 z-0" />
      )}

      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 text-gray-900 font-bold text-lg mb-3 shadow-sm relative z-10">
        {i + 1}
      </div>

      <p className="text-gray-700 font-medium relative z-10">{step}</p>
    </div>
  ))}
</div>
      </section>

      <section className="bg-gradient-to-r from-yellow-100/30 to-yellow-100/30 rounded-xl text-gray-900 text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Ride with Us?
        </h2>
        <p className="mb-6">
          Start earning today with just a few clicks.
        </p>
        <button className="bg-gray-900 text-yellow-500 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition">
          Join Now
        </button>
      </section>

      <footer className="text-center text-gray-500 text-sm py-6">
        © 2026 Rider Platform. All rights reserved.
      </footer>

    </div>
  )
}

export default Riderdashboard
