import commonemitHandler from "@/config/commonemit";
import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const {userid,items,paymentmethod,totalammount,adress} = await req.json();
        if(!userid||!items||!paymentmethod||!totalammount||!adress){
            return NextResponse.json({
            message:'please send all credentionals',
            status:400
           })
        }
        const user = await User.findById(userid);
         if(!user){
            return NextResponse.json({
            message:'user not found',
            status:400
           })
        }
        if(paymentmethod==='cod'){
            const newOrder = await Order.create({
                user:userid,
                items,
                paymentmethod,
                totalammount,
                adress
            })
            await commonemitHandler('neworders',newOrder);
            return NextResponse.json({
            newOrder,
            status:200
           })
        }

    }catch(error){
        return NextResponse.json({
            message:'place order error',
            status:500
           })
    }
}