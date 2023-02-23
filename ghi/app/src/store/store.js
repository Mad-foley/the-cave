import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './queries/authApi'
import { wineApi } from './queries/wineApi'

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ] : authApi.reducer,
        [ wineApi.reducerPath ] : wineApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware).concat(wineApi.middleware)
    },
})

setupListeners(store.dispatch)
