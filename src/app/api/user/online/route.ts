import connectDB from "@/config/db";
import Order from "@/models/ordermodel";
import User from "@/models/usermodel";
import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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
            const newOrder = await Order.create({
                user:userid,
                items,
                paymentmethod,
                totalammount,
                adress
            })

        //stripe ki configuration
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.LOCALHOST_URL}/user/ordersuccess`,
            cancel_url:`${process.env.LOCALHOST_URL}/user/ordercancle`,
            line_items: [
                {
                    price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: 'SabziMart Order Payment',
                    },
                    unit_amount: totalammount*100,
                    },
                    quantity: 1,
                },
            ],
        metadata:{orderid:newOrder._id.toString()}
        })
    return NextResponse.json({
                url:session.url,
                status:200
               })

    }catch(error){
        return NextResponse.json({
            message:'order payment error',
            status:500
           })
    }
}