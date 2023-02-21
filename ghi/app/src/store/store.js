import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './queries/authApi'
import { userApi } from './queries/userApi'

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ] : authApi.reducer,
        [ userApi.reducerPath ] : userApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware)
    },
})

setupListeners(store.dispatch)
