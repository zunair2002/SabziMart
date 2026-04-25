import connectDB from "@/config/db";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, location  } = await req.json();
    if (!userId || !location ) {
      return NextResponse.json(
        { message: "missing fields userId and location" },
        { status: 400 },
      );
    }
    const user = await User.findByIdAndUpdate(userId,{ location: location });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "location updated" }, { status: 200 });
  } // route.ts
catch (error: any) {
  console.log("ACTUAL DB ERROR:", error.message); // <--- Yeh line Next.js terminal mein error batayegi
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
