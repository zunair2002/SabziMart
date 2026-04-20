import { auth } from "@/auth";
import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import User from "@/models/usermodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectDB();
        const session = await auth();
        const orders = await Order.find({
            user: new mongoose.Types.ObjectId(session?.user.id)
            }).populate('user','-password');

        if(!orders){
         return NextResponse.json({
                    message:'orders not found',
                    status:400
                   })
        }
         return NextResponse.json({
                    orders,
                    status:200
                   })
    } catch (error) {
        return NextResponse.json({
                    message:`orders error: ${error}`,
                    status:400
                   })
    }
}