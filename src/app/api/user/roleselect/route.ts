import { auth } from "@/auth";
import connectDB from "@/config/db";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const session = await auth();
        const { role, mobile } = await req.json();
        const user = await User.findOneAndUpdate({email:session?.user.email},{role,mobile},{new:true});
        if(!user){
           return NextResponse.json({
            message:'User not found!',
            status:400
           })
        }
        return NextResponse.json({user,status:200});

    }catch(error){
        return NextResponse.json({
            message:'updation failed error',
            status:500
           })
    }
}