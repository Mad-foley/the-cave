import { createSlice } from "@reduxjs/toolkit";


export const wineRecSlice = createSlice({
    name: 'wineRecommendation',
    initialState: {wine: {
        name: '',
        location: '',
        varietal: '',
        winery: '',
        vintage: '',
        image_url: ''
    }},
    reducers: {
        setWine: (state,action) => {
            state.wine = action.payload
        },
    }
})

export const {setWine} = wineRecSlice.actions
export default wineRecSlice.reducer
