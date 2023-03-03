import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authApi } from './authApi'
import { baseUrl } from '../../utilities/constants'

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
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
    tagTypes: ['Comments'],
    endpoints: (build) => ({
        getComments: build.query({
            query: () => ({
                url: '/api/comments',
                method: 'get',
                credentials: 'include'
            }),
            providesTags: ['Comments']
        }),
        getCommentById: build.query({
            query: (comment_id) => ({
                url: `/api/comments/${comment_id}`,
                method: 'get',
                credentials: 'include'
            }),
        }),
        getCommentByWineId: build.query({
            query: (wine_id) => ({
                url: `/api/wines/${wine_id}/comments`,
                method: 'get',
                credentials: 'include'
            }),
            providesTags: ["Comments"]
        }),
        getCommentByUser: build.query({
            query: (user_id) => ({
                url: `/api/users/${user_id}/comments`,
                method: 'get',
                credentials: 'include'
            }),
        }),
        createComment: build.mutation({
            query: (data) => {
                return {
                    url: `/api/wines/${data.wine_id}/comments`,
                    method: 'post',
                    credentials: 'include',
                    body: {comment: data.comment}
                }
            },
            invalidatesTags: ["Comments"]
        }),
        deleteComment: build.mutation ({
            query: (comment_id) => ({
                url: `/api/wines/comments/${comment_id}`,
                method: `delete`,
                credentials: 'include'
            }),
            invalidatesTags: ["Comments"]
        }),
        updateComment: build.mutation({
            query: (data) => ({
                url: `/api/wines/comments/${data.comment_id}`,
                method: 'put',
                credentials: 'include',
                body: data.comment
            }),
            invalidatesTags: ["Comments"]
        }),
    })
})

export const {
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useCreateCommentMutation,
    useGetCommentByUserQuery,
    useGetCommentByWineIdQuery,
    useGetCommentByIdQuery,
    useGetCommentsQuery

} = commentsApi
