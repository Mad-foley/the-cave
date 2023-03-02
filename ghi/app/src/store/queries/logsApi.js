import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authApi } from "./authApi";
import { baseUrl } from "../../utilities/constants";


export const logsApi = createApi({
    reducerPath: 'logsApi',
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
    tagTypes: ['Logs'],
    endpoints: (build) => ({
        getLogs: build.query({
            query: () => ({
                url: 'api/logs/me',
                method: 'get',
                credentials: 'include'
            })
        })
    })
})

export const {
    useGetLogsQuery
} = logsApi
