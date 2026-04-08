import mongoose from "mongoose";
interface Igerocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
}

const geroceryschema = new mongoose.Schema<Igerocery>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
      "Fruits & Veg",
      "Dairy & Eggs",
      "Meat & Fish",
      "Bakery",
      "Drinks",
      "Snacks",
      "Pantry",       
      "Frozen",
      "Household",
      "Personal Care",
      "Organic",
      "Pet Care",
      "Other"
      ],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum:[
          "kg",
          "g",
          "liter",
          "ml",
          "pack",
          "piece",
          "bottle",
          "box",
          "dozen",
          "bag",
          "jar",
          "can",
          "tube"
      ]
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true })

const Gerocery = mongoose.models.Gerocery || mongoose.model('Gerocery',geroceryschema);
export default Gerocery;