import commonemitHandler from "@/config/commonemit";
import connectDB from "@/config/db";
import OrderAssignment from "@/models/orderassignmentmodel";
import Order from "@/models/ordermodel";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { orderid: string } }) {
    try {
        await connectDB();
        const { orderid } = await params;
        const { status } = await req.json();

        const order = await Order.findById(orderid);
        if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        order.status = status;
        let deliveryRidersPayload: any = [];

        // Check 1: Kya spelling exact match ho rahi hai?
        if (status.toLowerCase() === 'out of delivery') {
            const coords = order.adress;

            if (coords && coords.latitude && coords.longitude) {
                const lng = Number(coords.longitude);
                const lat = Number(coords.latitude);
                // Check 2: Distance ko 5km se barha kar 500km kar dein (Testing ke liye)
                // Check 3: isOnlinestatus ko hata kar dekhein shayad wo false ho
                const nearbyRiders = await User.find({
                    role: 'rider',
                    // isOnlinestatus: true, // Temporarily commented for testing
                    location: {
                        $near: {
                            $geometry: { 
                                type: 'Point', 
                                coordinates: [lng, lat] 
                            },
                            $maxDistance: 5000 // 500km radius (zyada distance)
                        }
                    }
                });

                console.log("Nearby Riders Found Count:", nearbyRiders.length);
                if(nearbyRiders.length > 0) {
                    console.log("First Rider Name:", nearbyRiders[0].name);
                }
                if (nearbyRiders.length > 0) {
                    const riderIds = nearbyRiders.map((r) => r._id);
                    const assignment = await OrderAssignment.create({
                        order: order._id,
                        brodcasting: riderIds,
                        status: 'brodcasted'
                    });

                    order.assignment = assignment._id;

                    deliveryRidersPayload = nearbyRiders.map(rider => ({
                        id: rider._id,
                        name: rider.name,
                        mobile: rider.mobile,
                        latitude: rider.location.coordinates[1],
                        longitude: rider.location.coordinates[0],
                    }));
                }
            }
        }

        await order.save();
        await commonemitHandler('updatestatus',{orderid:order._id,status:order.status});
        const finalOrder = await Order.findById(orderid).populate({
            path: 'assignment',
            populate: {
                path: 'order' 
            }
        });

        return NextResponse.json({
            message: "Order updated successfully",
            order: finalOrder,
            availableRiders: deliveryRidersPayload
        }, { status: 200 });

    } catch (error: any) {
        console.error("Route Error:", error.message);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}