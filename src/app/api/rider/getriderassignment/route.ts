import { auth } from "@/auth";
import connectDB from "@/config/db";
import OrderAssignment from "@/models/orderassignmentmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const session = await auth();
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const userId = session.user.id;
        const assignments = await OrderAssignment.find({
            brodcasting: userId, 
            status: 'brodcasted',
            rejectedBy: { $ne: userId } 
        }).populate({
            path: 'order'
        }).sort({ createdAt: -1 });

        return NextResponse.json(assignments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
    }
}