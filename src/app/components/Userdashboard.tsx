import React from "react";
import UserHomepage from "./UserHomepage";
import CategoriesSlider from "./CategoriesSlider";
import GeroceryCart from "./GeroceryCart";
import connectDB from "@/config/db";
import Gerocery from "@/models/gerocerymodel";
import Testimonial from "./Testimonial";

async function Userdashboard() {
  await connectDB();
  const gerocery_data = await Gerocery.find({});
  const plaingerocery = JSON.parse(JSON.stringify(gerocery_data));

  return (
    <div className="min-h-screen pb-20">
  <UserHomepage />
  <CategoriesSlider />

  <div className="w-[95%] mx-auto mt-1 mb-8 text-left relative">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase">
              AVALAIBLE<span className="text-[#ffbb38]"> CATEGORY</span>
            </h2>
  </div>
<div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 py-8">
    {plaingerocery.map((i: any) => (
      <GeroceryCart key={i._id} i={i} />
    ))}
  </div>
</div>
<div>
<Testimonial/>
</div>
</div>
  );
}

export default Userdashboard;
