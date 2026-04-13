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
   cartdata:Igerocery[],
   subtotal:number,
   dileveryfee:number,
   totalammount:number
}
const initialState:CartSlice = {
   cartdata: [],
   subtotal: 0,
   dileveryfee: 200,
   totalammount: 200
}

const cartslice = createSlice({
    name:'cart',
    initialState,
    //jysy setname hota na jo name state manage krta same aysy is may reducer hay
    reducers:{
        setcartdata:(state,action:PayloadAction<Igerocery>)=>{
            state.cartdata.push(action.payload);
            cartslice.caseReducers.calculatetotalamount(state);
        },
    //cart ki quantity manage kay liye reducer
       addquantity: (state,action:PayloadAction<string>) => {
        const item = state.cartdata.find(i=>String(i._id)===action.payload);
        if (item) {
            item.quantity += 1;
            }
            cartslice.caseReducers.calculatetotalamount(state);
        },
         substractquantity: (state,action:PayloadAction<string>) => {
        const item = state.cartdata.find(i=>String(i._id)===action.payload);
        if (item?.quantity && item.quantity > 1) {
            item.quantity -= 1;
            }
            else{
               state.cartdata = state.cartdata.filter(i=>String(i._id) !== action.payload)
            }
            cartslice.caseReducers.calculatetotalamount(state);
        },
        removecart: (state,action:PayloadAction<string>) => {
            state.cartdata = state.cartdata.filter(i=>String(i._id) !== action.payload)
            cartslice.caseReducers.calculatetotalamount(state);
        },
        calculatetotalamount:(state)=>{
            state.subtotal = state.cartdata.reduce((sum,item)=>sum + Number(item.price) * item.quantity,0)
            state.dileveryfee = state.subtotal>1000?0:200
            state.totalammount = state.subtotal + state.dileveryfee
        }
    }

})
export const {setcartdata,addquantity,substractquantity,removecart} = cartslice.actions;
export default cartslice.reducer;