import { createSlice } from "@reduxjs/toolkit";


export const wineIdSlice = createSlice({
    name: 'wineId',
    initialState: {wineId: 1},
    reducers: {
        setId: (state,action) => {
            state.wineId = action.payload
        },
    },


})

export const {setId} = wineIdSlice.actions
export default wineIdSlice.reducer
