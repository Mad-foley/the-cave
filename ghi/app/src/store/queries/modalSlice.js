import {createSlice} from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    logged: false,
    blur: false,
    loginWindow: false,
    logoutWindow: false,
    deleteWindow: false,
    deleteWine: {},
    deleteUserWindow: false,
    expandWine: []
  },
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setLogged: (state, action) => {
      state.logged = action.payload;
    },
    setBlur: (state, action) => {
      state.blur = action.payload;
    },
    setLoginWindow: (state, action) => {
      state.loginWindow = action.payload;
    },
    setLogoutWindow: (state, action) => {
      state.logoutWindow = action.payload;
    },
    setDeleteWindow: (state, action) => {
      state.deleteWindow = action.payload;
    },
    setDeleteWine: (state, action) => {
      state.deleteWine = action.payload;
    },
    setDeleteUserWindow: (state, action) => {
      state.deleteUserWindow = action.payload
    },
    setExpandWine: (state, action) => {
      state.expandWine = action.payload
    }
  },
});

export const {setModal, setBlur, setDeleteWindow, setDeleteWine,
    setLogged, setLoginWindow, setLogoutWindow,
  setDeleteUserWindow, setExpandWine} = modalSlice.actions
export default modalSlice.reducer
