import connectDB from "@/config/db";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { userId, socketid } = await req.json();

        const user = await User.findByIdAndUpdate(
            userId,
            {
                socketid,
                isOnlinestatus: true,
            },
            { new: true }
        );
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}