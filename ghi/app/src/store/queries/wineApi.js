import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authApi } from './authApi'
import { baseUrl } from '../../utilities/constants'


export const wineApi = createApi({
    reducerPath: 'wineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders:(headers, {getState}) => {
            const selector = authApi.endpoints.getToken.select()
            const {data : token_data} = selector(getState())
            if (token_data) {
                headers.set('Authorization', `Bearer ${token_data.access_token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Wines', 'Wine', 'Favorites'],
    endpoints: (build) => ({
        getWines: build.query({
            query: () => ({
                url: '/api/wines',
                method: 'get'
            }),
            providesTags: ['Wines']
        }),
        getWineById: build.query({
            query: (wine_id) => ({
                    url: `/api/wines/${wine_id || 1}`,
                    method: 'get'
            })
        }),
        createWine: build.mutation({
            query: (data) => {
                return {
                    url: '/api/wines',
                    method: 'post',
                    credentials: 'include',
                    body: data
                }
            },
            invalidatesTags: ['Wines']
        }),
        deleteWine: build.mutation ({
            query: (wine_id) => ({
                url: `/api/wines/${wine_id}`,
                method: 'delete',
                credentials: 'include'
            }),
            invalidatesTags: ["Wines"]
        }),
        updateWine: build.mutation ({
            query: (data) => ({
                url: `/api/wines/${data.id}`,
                method: 'put',
                credentials:'include',
                body: data.form
            }),
            invalidatesTags: ['Wines']
        }),
        getFavorite: build.query({
            query: () => ({
                url: '/api/wines/favorites/',
                method:'get',
                credentials:'include'
            }),
            providesTags: ['Favorites']
        }),
    })
})

export const {
    useGetWinesQuery,
    useGetWineByIdQuery,
    useCreateWineMutation,
    useDeleteWineMutation,
    useUpdateWineMutation,
    useGetFavoriteQuery
} = wineApi
