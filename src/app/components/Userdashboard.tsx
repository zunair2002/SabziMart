import React from "react";
import UserHomepage from "./UserHomepage";
import CategoriesSlider from "./CategoriesSlider";
import GeroceryCart from "./GeroceryCart";
import connectDB from "@/config/db";
import Gerocery from "@/models/gerocerymodel";

async function Userdashboard() {
  await connectDB();
  const gerocery_data = await Gerocery.find({});
  const plaingerocery = JSON.parse(JSON.stringify(gerocery_data));

  return (
    <div>
      <UserHomepage />
      <CategoriesSlider />
      <div className="w-[95%] mx-auto my-8 text-center relative">
        <h2 className="font-semibold text-[30px] text-gray-800 mb-6 rounded-full text-center inline-block p-1.5 px-8">
          Grocery Items
        </h2>
      </div>
  <div className="w-[96%] max-w-[1600px] mx-auto mt-8 border-[0.25px] text-gray-300 rounded-lg">
  <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 py-3">
    {plaingerocery.map((i: any) => (
      <GeroceryCart key={i._id} i={i} />
    ))}
  </div>
</div>
    </div>
  );
}

export default Userdashboard;
