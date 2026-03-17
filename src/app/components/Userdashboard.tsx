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
      <div className="w-[95%] mx-auto mt-10">
        <div
          className="grid gap-3 
                  grid-cols-3     
                  sm:grid-cols-4  
                  md:grid-cols-6   
                  lg:grid-cols-7"
        >
          {plaingerocery.map((i: any) => (
            <GeroceryCart key={i._id} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
