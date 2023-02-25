import { createSlice } from "@reduxjs/toolkit";
import { wineApi } from "./wineApi";


export const wineSlice = createSlice({
    name: 'wine',
    initialState: {wineList:{}},
    reducers: {
        addWine: (state,action) => {
            state.wineList = action.payload
        },
        wineState: (state) => state.test
    },

})

export const {addWine, wineState} = wineSlice.actions
export default wineSlice.reducer
