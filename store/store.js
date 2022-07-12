import { configureStore } from "@reduxjs/toolkit";

import callApiSlice from "./callApiSlice";

export const callApiSliceAction=callApiSlice.actions;
const store=configureStore({reducer:callApiSlice.reducer})
export const thunkFunction=(data)=>{
    return async (dispatch)=>{
        dispatch(callApiSliceAction.callApi(data))
    }

}
export default store;