import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers, {getState}) => {
        const selector = authApi.endpoints.getToken.select()
        const {data : token_data} = selector(getState())
        if (token_data) {
            headers.set('Authorization', `Bearer ${token_data.access_token}`)
        }
        return headers
    }
    }),
    tagTypes: ['Token', 'User'],
    endpoints: (build) => ({
        getToken: build.query ({
            query: () => ({
                url: '/token',
                method: 'get',
                credentials: 'include'
            }),
            providesTags: ['Token']
        }),
        logIn: build.mutation ({
            query: data => {
                let formData = null
                if (data instanceof HTMLElement) {
                    formData = new FormData(data)
                }
                else {
                    formData = new FormData()
                    formData.append("username", data.username)
                    formData.append("password", data.password)
                }

                return {
                    url: '/token',
                    method: 'post',
                    credentials: 'include',
                    body: formData
                }
            },
            providesTags: ['Token']
        }),
        logOut: build.mutation ({
            query: () => ({
                url: '/token',
                method: 'delete',
                credentials: 'include'
            }),
            invalidatesTags: ["Token"]
        }),
        getUsers: build.query({
            query: () => ({
                url: "/api/users",
                credentials: "include",
            }),
            providesTags: ["User"],
        }),
        createUser: build.mutation({
            query: (data) => {
                return {
                    url: "/api/users",
                    method: "post",
                    body: data
                    }
                },
            providesTags: ["User"],
            }),
        updateUser: build.mutation({
            query: (data, user_id) => {
                return {
                    url: `/api/users/${user_id}`,
                    method: "put",
                    body: data
                    }
            },
            providesTags: ["User"],
            invalidatesTags: ["Token", "User"],

            }),

        }),
    })

export const {
    useGetTokenQuery,
    useLogInMutation,
    useLogOutMutation,
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation

} = authApi
