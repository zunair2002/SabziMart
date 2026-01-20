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

},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User",userschema)
export default User