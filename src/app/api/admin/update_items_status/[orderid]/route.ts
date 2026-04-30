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

        if (status.toLowerCase() === 'out of delivery') {
            const coords = order.adress;

            if (coords && coords.latitude && coords.longitude) {
                const lng = Number(coords.longitude);
                const lat = Number(coords.latitude);

                const nearbyRiders = await User.find({
                    role: 'rider',
                    location: {
                        $near: {
                            $geometry: { type: 'Point', coordinates: [lng, lat] },
                            $maxDistance: 5000 
                        }
                    }
                });


                if (nearbyRiders.length > 0) {
                    const riderIds = nearbyRiders.map((r) => r._id);
                    
                    const assignment = await OrderAssignment.create({
                        order: order._id,
                        brodcasting: riderIds,
                        status: 'brodcasted'
                    });

                    order.assignment = assignment._id;

                    const populatedAssignment = await OrderAssignment.findById(assignment._id).populate('order');

                    await commonemitHandler('new-assignment', {
                        assignment: populatedAssignment,
                        riderIds: riderIds
                    });

                    deliveryRidersPayload = nearbyRiders.map(rider => ({
                        id: rider._id,
                        name: rider.name,
                        mobile: rider.mobile,
                    }));
                }
            }
        }

        await order.save();
        
        await commonemitHandler('updatestatus', { orderid: order._id, status: order.status });

        const finalOrder = await Order.findById(orderid).populate({
            path: 'assignment',
            populate: { path: 'order' }
        });

        return NextResponse.json({
            message: "Order updated successfully",
            order: finalOrder,
            availableRiders: deliveryRidersPayload
        }, { status: 200 });

    } catch (error: any) {
        console.error("Admin Route Error:", error.message);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}