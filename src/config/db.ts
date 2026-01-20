import mongoose from 'mongoose';

const MONGOOSE_URL = process.env.MONGOOSE_URL;
if(!MONGOOSE_URL){
throw new Error("DB is not connected!");
}

//connection ko cache may store kr rhy || agr cache may connection nahi new eshtablish kry gay

let cache = global.mongoose
if(!cache){
    cache = global.mongoose = {conn:null,promise:null}
}
if(!cache.promise){
    cache.promise=mongoose.connect(MONGOOSE_URL).then((conn)=>conn.connection)
}
const connectDB = async()=>{
    if(cache.conn){
        return cache.conn
    }
    try{
        const conn = await cache.promise
        return conn
    }catch(error){
        console.log(error)
    }
}
export default connectDB;