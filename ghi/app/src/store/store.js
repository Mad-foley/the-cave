import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './queries/authApi'

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ] : authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware)
    },
})

setupListeners(store.dispatch)
