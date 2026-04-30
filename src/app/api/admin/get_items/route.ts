import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
       await connectDB();
       const allorders = await Order.find({})
           .populate('user','-password')
           .populate({
               path: 'assignment',
               populate: {
                   path: 'assignto',
                   model: 'User',
                   select: 'name mobile'
               }
           });
       return NextResponse.json(allorders , { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to get items" }, { status: 500 });
    }
}