import { auth } from "@/auth";
import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await auth();
    
    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(session?.user.id),
    })
      .populate("user", "-password")
      .populate({
        path: "assignment",
        populate: {
          path: "assignto",
          select: "name mobile",
        },
      });

    return NextResponse.json({
      orders: orders || [],
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: `orders error: ${error}`,
      status: 400,
    });
  }
}