import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authApi } from './authApi'
import { baseUrl } from '../../utilities/constants'


export const likesApi = createApi({
    reducerPath: 'likesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders:(headers, {getState}) => {
            const selector = authApi.endpoints.getToken.select()
            const {data: token_data} = selector(getState())
            if (token_data) {
                headers.set('Authorization', `Bearer ${token_data.access_token}`)
            }
            return headers
        }
    }),
    tagTypes: ['LikesByWine', 'Likes'],
    endpoints: (build) => ({
        getLikesByWines: build.query({
            query: (wine_id) => ({
                url: `/api/wines/${wine_id}/likes`,
                method: 'get',
                credentials: 'include'
            }),
            providesTags: (result, error, arg) => [{ type : 'LikesByWine', 'id' : arg }]
        }),
        getLikesByUser: build.query({
            query: () => ({
                url: `/api/user/me/likes`,
                method: 'get',
                credentials: 'include'
            }),
            providesTags: (result, error, arg) => [{ type : 'LikesByUser', 'id' : arg }]
        }),
        createLike: build.mutation({
            query: (wine_id) => {
                let formData = null
                try{
                    if (wine_id instanceof HTMLElement){
                        formData = new FormData({"wine_id": wine_id})
                    }
                    else {
                        formData = new FormData()
                        formData.append("wine_id", wine_id)
                    }
                }
                catch(e){ console.log(e)}
                return (
                    {
                        url: `/api/wines/${wine_id}/likes`,
                        method: 'post',
                        credentials: 'include',
                        body: formData
                    }
                )
            },
            invalidatesTags: ['LikesByWine', 'Likes']
        }),
        deleteLike: build.mutation({
            query: (wine_id) => ({
                url: `/api/wines/${wine_id}/likes`,
                method: 'delete',
                credentials: 'include'
            }),
            invalidatesTags: ['LikesByWine', 'Likes']
        }),
        getAllLikes: build.query({
            query: () => ({
                url: '/api/likes',
            }),
            providesTags:['Likes']
        })
    })
})

export const {
    useGetLikesByWinesQuery,
    useGetLikesByUserQuery,
    useCreateLikeMutation,
    useDeleteLikeMutation,
    useGetAllLikesQuery
} = likesApi
