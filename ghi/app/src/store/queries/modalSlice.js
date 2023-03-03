import {createSlice} from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: {
        modal: {
            logged: false,
            blur: false,
            loginWindow: false,
            logoutWindow: false,
        }
    },
    reducers: {
        setModal: (state, action) => {
            state.modal = action.payload
        },
    },
})

export const {setModal} = modalSlice.actions
export default modalSlice.reducer
