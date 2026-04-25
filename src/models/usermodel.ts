import mongoose from "mongoose";

// user ka interface bhna rhy
interface Iuser{
    _id?:mongoose.Types.ObjectId
    name:string,
    email:string,
    password?:string,
    mobile?:string,
    image?:string,
    role:"user"|"admin"|"rider"
    location: {
        type: string;
        coordinates: number[];
    };
    socketid:string,
    isOnlinestatus:boolean,
}
const userschema = new mongoose.Schema<Iuser>({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    unique:true,
    required:true,
},
password:{
    type:String,
    required:false,
},
mobile:{
    type:String,
    required:false,
},
role:{
    type:String,
    enum:["user","admin","rider"],
    default:"user",
},
image:{
    type:String,
},
location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
socketid:{
    type:String,
    default:null
},
isOnlinestatus:{
    type:Boolean,
    default:false
}
},{timestamps:true})

userschema.index({ location: '2dsphere' });
const User = mongoose.models.User || mongoose.model("User",userschema)
export default User