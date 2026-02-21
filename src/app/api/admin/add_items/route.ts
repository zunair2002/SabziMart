// app/api/items/route.ts
import { auth } from "@/auth";
import cloudinary, { uploadImage } from "@/config/cludinary";
import connectDB from "@/config/db";
import Gerocery from "@/models/gerocerymodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // 1. Security Check
        const session = await auth();
        if (session?.user?.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // 2. Get Data from Form
        const data = await req.formData();
        const name = data.get('name') as string;
        const category = data.get('category') as string;
        const unit = data.get('unit') as string;
        const price = data.get('price') as string;
        const file = data.get('image') as File;

        // upload the image
        let imageURL='';
        if (file) {
         imageURL = await uploadImage(file,'grocery_items')
        }

        // save into DB
        const gerocerydata = await Gerocery.create({
            name,category,unit,price,file:imageURL
        })
        return NextResponse.json({
            message:"Gerocery items added successfully",
            status:200
        })

    } catch (error) {
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}