import { createSlice } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface Iuser{
    _id?:mongoose.Types.ObjectId
    name:string,
    email:string,
    password?:string,
    mobile?:string,
    image?:string,
    role:"user"|"admin"|"rider"
}
interface IUserSlice{
    userData:Iuser | null
}
const initialState:IUserSlice = {
    userData: null
}

const userslice = createSlice({
    name:'user',
    initialState,
    //jysy setname hota na jo name state manage krta same aysy is may reducer hay
    reducers:{
        setuserData:(state,action)=>{
            state.userData = action.payload
        }
    }

})
export const {setuserData} = userslice.actions;
export default userslice.reducer;