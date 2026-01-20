import mongoose from "mongoose";
interface Igerocery {
  id?: mongoose.Types.ObjectId;
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
        "Fruits",
        "Vegetables",
        "Dairy",
        "Meat & Seafood",
        "Bakery",
        "Beverages",
        "Snacks",
        "Pantry",
        "Frozen",
        "Household",
        "Personal Care",
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
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true })

const Gerocery = mongoose.models.Gerocery || mongoose.model('Gerocery',geroceryschema);
export default Gerocery;