import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './queries/authApi'
import { wineApi } from './queries/wineApi'
import { likesApi } from './queries/likesApi'
import { commentsApi } from './queries/commentsApi'

import wineIdSlice from './queries/wineSlice'

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ] : authApi.reducer,
        [ wineApi.reducerPath ] : wineApi.reducer,
        [ likesApi.reducerPath ] : likesApi.reducer,
        [ commentsApi.reducerPath ] : commentsApi.reducer,
        ['wineId']:wineIdSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(wineApi.middleware)
            .concat(likesApi.middleware)
            .concat(commentsApi.middleware)
    },
})

setupListeners(store.dispatch)
