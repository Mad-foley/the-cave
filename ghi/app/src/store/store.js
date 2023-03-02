import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './queries/authApi'
import { wineApi } from './queries/wineApi'
import { likesApi } from './queries/likesApi'
import { commentsApi } from './queries/commentsApi'
import { logsApi } from './queries/logsApi'
import { recApi } from './queries/recApi'

import wineIdSlice from './queries/wineSlice'

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ] : authApi.reducer,
        [ wineApi.reducerPath ] : wineApi.reducer,
        [ likesApi.reducerPath ] : likesApi.reducer,
        [ commentsApi.reducerPath ] : commentsApi.reducer,
        [ logsApi.reducerPath ] : logsApi.reducer,
        [ recApi.reducerPath ] : recApi.reducer,
        ['wineId']:wineIdSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(wineApi.middleware)
            .concat(likesApi.middleware)
            .concat(commentsApi.middleware)
            .concat(logsApi.middleware)
            .concat(recApi.middleware)
    },
})

setupListeners(store.dispatch)
