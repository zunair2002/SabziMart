import { configureStore } from "@reduxjs/toolkit";
import userslice from "./userSlice";

export const store = configureStore({
    reducer:{
        user:userslice
    }
})

//state sy data ly kr ata
export type RootState = ReturnType<typeof store.getState>
//state may data dalta hay
export type AppDispatch = typeof store.dispatch