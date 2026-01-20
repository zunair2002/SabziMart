import connectDB from "@/config/db";
import User from "@/models/usermodel";
import bcrypt from "bcryptjs";
import { hash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
try{
    await connectDB();
    const {name,email,password} = await req.json()
    const existuser = await User.findOne({email})
    if(existuser){
        return NextResponse.json({
            message:"User already exist",
            status:400
        })
    }
    if(password.length<6){
        return NextResponse.json({
            message:"Password must be greater then 6 charcters",
            status:400
        })
    }
    const hashpass = await bcrypt.hash(password,10);
    const user = await User.create({
        name,email,password:hashpass
    })
    return NextResponse.json({
            message:"User Registerd successfully!",
            status:200
        })
}catch(error){
    return NextResponse.json({
            message:`Registerd error ${error}`,
            status:500
        })
}
}

//connect DB
//name,email,password form frontend
//email uniqueness
//password strength
//password hashing
//user create