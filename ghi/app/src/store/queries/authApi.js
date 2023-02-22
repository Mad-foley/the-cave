import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/token',
        prepareHeaders: (headers, {getState}) => {
        const selector = authApi.endpoints.getToken.select()
        const {data : token_data} = selector(getState())
        if (token_data) {
            headers.set('Authorization', `Bearer ${token_data.access_token}`)
        }
        return headers
    }
    }),
    tagTypes: ['Token'],
    endpoints: (build) => ({
        getToken: build.query ({
            query: () => ({
                url: '',
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
                    url: '',
                    method: 'post',
                    credentials: 'include',
                    body: formData
                }
            },
            providesTags: ['Token']
        }),
        logOut: build.mutation ({
            query: () => ({
                url: '',
                method: 'delete',
                credentials: 'include'
            }),
            invalidatesTags: ["Token"]
        })
    }),
})

export const { useGetTokenQuery, useLogInMutation, useLogOutMutation } = authApi
