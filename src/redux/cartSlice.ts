import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface Igerocery {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  quantity:number,
  image: string;
}

interface CartSlice{
   cartdata:Igerocery[];
}
const initialState:CartSlice = {
   cartdata: []
}

const cartslice = createSlice({
    name:'cart',
    initialState,
    //jysy setname hota na jo name state manage krta same aysy is may reducer hay
    reducers:{
        setcartdata:(state,action:PayloadAction<Igerocery>)=>{
            state.cartdata.push(action.payload);
        },
    //cart ki quantity manage kay liye reducer
       addquantity: (state,action:PayloadAction<string>) => {
        const item = state.cartdata.find(i=>String(i._id)===action.payload);
        if (item) {
            item.quantity += 1;
            }
        },
         substractquantity: (state,action:PayloadAction<string>) => {
        const item = state.cartdata.find(i=>String(i._id)===action.payload);
        if (item?.quantity && item.quantity > 1) {
            item.quantity -= 1;
            }
            else{
               state.cartdata = state.cartdata.filter(i=>String(i._id) !== action.payload)
            }
        }
    }

})
export const {setcartdata,addquantity,substractquantity} = cartslice.actions;
export default cartslice.reducer;