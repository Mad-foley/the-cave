import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authApi, useGetTokenQuery } from './authApi'


export const wineApi = createApi({
    reducerPath: 'wineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders:(headers, {getState}) => {
            const selector = authApi.endpoints.getToken.select()
            const {data : token_data} = selector(getState())
            if (token_data) {
                headers.set('Authorization', `Bearer ${token_data.access_token}`)
            }
            return headers
        }
        // prepareHeaders: headers => {
        //     const {data: token_data} = useGetTokenQuery()
        //     if(token_data) {
        //         headers.set('Authorization', `Bearer ${token_data.access_token}`)
        //     }
        //     return headers
        // }
    }),
    tagTypes: ['Wines', 'Wine'],
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
                    url: `/api/wines/${wine_id}`,
                    method: 'get'
            }),
            providesTags: (result, error, arg) => [{ type : "Wine", "id" : arg }]
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
            providesTags: (result, error, arg) => [{ type : "Wine", "id" : arg }]
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
            providesTags: (result, error, arg) => [{ type : "Wine", "id" : arg }]
        }),
    })
})

export const {
    useGetWinesQuery,
    useGetWineByIdQuery,
    useCreateWineMutation,
    useDeleteWineMutation,
    useUpdateWineMutation
} = wineApi
