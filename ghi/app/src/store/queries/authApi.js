import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/token',
    prepareHeaders:
    (headers, {getState} ) =>{
        const selector = authApi.endpoints.getUser.select()
        const {data : token_data} = selector(getState())
        if (token_data) {
            headers.set('Authorization', `Bearer ${token_data.access_token}`)
        }
        return headers
    }
    }),
    tagTypes: ['token'],
    endpoints: (build) => ({
        getUser: build.query ({
            query: () => ({
                url: '',
                method: 'get',
                credentials: 'include'
            }),
            providesTags: ['token']
        })
    })
})

export const { useGetUserQuery } = authApi
