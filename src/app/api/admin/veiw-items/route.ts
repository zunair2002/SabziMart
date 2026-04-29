import connectDB from "@/config/db";
import Gerocery from "@/models/gerocerymodel";
import Order from "@/models/ordermodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
       await connectDB();
       const allorders = await Gerocery.find({});
       return NextResponse.json(allorders , { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to get items" }, { status: 500 });
    }
}