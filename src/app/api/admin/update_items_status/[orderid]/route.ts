import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{orderid:string}}) {
    try {
        await connectDB()
        const {orderid} = await params
        const {status} = await req.json()
        const order = await Order.findById(orderid).populate('user','-password')
        if(!order){
        return NextResponse.json({ message: "items not found" }, { status: 400 });
        }
        //status update kr liya
        order.status = status
        
        return NextResponse.json(order , { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update status of items" }, { status: 500 });
    }
}