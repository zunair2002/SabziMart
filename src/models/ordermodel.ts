import mongoose from "mongoose";

interface IOrder{
    _id?:mongoose.Types.ObjectId,
    user?:mongoose.Types.ObjectId,
    items:[
        {
            gerocery:mongoose.Types.ObjectId,
            name: string,
            category: string,
            price: string,
            unit: string,
            image: string,
            quantity:number
        }
    ],
    totalamount:number,
    paymentmethod:'cod'|'online',
    adress:{
    name: string,
    mobileno: string,
    city: string,
    state: string,
    zipcode: string,
    fulllocation: string,
    latitude:number,
    longitude:number
    },
    status:'pending'|'out of delivery'|'deliverd',
}

const orderschema = new mongoose.Schema<IOrder>({
user:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
    },
items:{
    gerocery:mongoose.Types.ObjectId,
    name: String,
    category: String,
    price: String,
    unit: String,
    image: String,
    quantity:Number
},
paymentmethod:{
    type:String,
    enum:['cod','online'],
    default:'cod'
},
totalamount:{
    type:Number
},
adress:{
    name: String,
    mobileno: String,
    city: String,
    state: String,
    zipcode: String,
    fulllocation: String,
    latitude:Number,
    longitude:Number
},
status:{
    type:String,
    enum:['pending','out of delivery','deliverd'],
    default:'pending'
}
},
{ timestamps: true })

const Order = mongoose.models.Order || mongoose.model('Order',orderschema);
export default Order;