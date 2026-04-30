import commonemitHandler from "@/config/commonemit";
import connectDB from "@/config/db";
import OrderAssignment from "@/models/orderassignmentmodel";
import Order from "@/models/ordermodel";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { assignmentId, orderId, action } = await req.json();
    const session = await auth();
    
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (action === "accepted") {
      const assignment = await OrderAssignment.findOneAndUpdate(
        { _id: assignmentId, status: "brodcasted" },
        {
          assignto: user._id,
          status: "assigned",
          acceptedAt: new Date()
        },
        { new: true }
      );

      if (!assignment) {
        return NextResponse.json({ success: false, error: "Order already taken" }, { status: 400 });
      }

      await Order.findByIdAndUpdate(orderId, {
        deliveryrider: user._id,
        status: "out of delivery",
        assignment: assignment._id
      });

      await commonemitHandler("assignment-accepted", {
        assignmentId,
        orderId,
        riderName: user.name
      });

    } else if (action === "rejected") {
      await OrderAssignment.findByIdAndUpdate(assignmentId, {
        $addToSet: { rejectedBy: user._id }, 
      });
    }

    return NextResponse.json({ success: true, action }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}