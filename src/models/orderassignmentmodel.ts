import mongoose from "mongoose";

interface IOrderAssignment{
_id?:mongoose.Types.ObjectId,
order:mongoose.Types.ObjectId,
brodcasting:mongoose.Types.ObjectId[],
assignto:mongoose.Types.ObjectId | null,
status:"brodcasted"|"assigned"|"completed",
acceptedAt?:Date,
createdAt?:Date,
updatedAt?:Date
}
const orderdeliveryschema = new mongoose.Schema<IOrderAssignment>({
    order:{
        type:mongoose.Types.ObjectId,
        ref:'Order'
    },
    brodcasting:[{
        type:mongoose.Types.ObjectId,
        ref:'User'

    }],
    assignto:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:["brodcasted","assigned","completed"],
        default:'brodcasted'
    },
    acceptedAt:{
        type:Date,
    },
},{timestamps:true})

const OrderAssignment = mongoose.models.Order || mongoose.model('OrderAssignment',orderdeliveryschema);
export default OrderAssignment;