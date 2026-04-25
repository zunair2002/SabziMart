import { auth } from "@/auth";
import connectDB from "@/config/db";
import OrderAssignment from "@/models/orderassignmentmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        connectDB();
        const session = await auth()
        const assignmnets = await OrderAssignment.find({
            brodcasting:session?.user.id,
            status:'brodcasted'
        }).populate({
        path: 'order'
    });
        return NextResponse.json(
            assignmnets,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Get assignment error: ${error}` },
            { status: 500 }
        );
    }
}
