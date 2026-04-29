import { auth } from "@/auth";
import commonemitHandler from "@/config/commonemit";
import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Authentication required: Please log in." }, { status: 401 });
        }

        const {items,paymentmethod,totalammount,adress} = await req.json();
        if(!items||!paymentmethod||!totalammount||!adress){
            return NextResponse.json({
            message:'please send all credentionals',
            status:400
           })
        }

        // SECURITY FIX: The user ID now comes from the secure session, not the request body.
        const user = await User.findById(session.user.id);
         if(!user){
            return NextResponse.json({
            message:'Authenticated user not found in database.',
            status:404
           })
        }
        if(paymentmethod==='cod'){
            const newOrder = await Order.create({
                user:session.user.id, // Use the secure session ID
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