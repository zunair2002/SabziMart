import mongoose from 'mongoose';

const MONGOOSE_URL = 'mongodb+srv://zunairshahid02_db_user:UXQkjGxziQeFYOwU@cluster0.i2q34ao.mongodb.net/GEROCERYDB';
console.log("--- DEBUG: MongoDB URL is:", MONGOOSE_URL ? "FOUND (check format)" : "NOT FOUND (undefined)");

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
                console.log("--- DEBUG: Using cached connection");

        return cache.conn
    }
    try{
        const conn = await cache.promise
                    console.log("--- DEBUG: Connected Successfully!");

        return conn
    }catch(error){
        console.log(error)
    }
     try {
        // Yahan galti thi: cache.conn ko assign karna zaroori hai
        cache.conn = await cache.promise;
        return cache.conn;
    } catch (error) {
        cache.promise = null; // Error aye to promise reset karein
        console.log("--- DEBUG: Connection Error Details:", error);
        throw error;
    }
}
export default connectDB;