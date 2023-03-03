import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseUrl} from "../../utilities/constants"


export const recApi = createApi({
    reducerPath: 'recApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ['Recs'],
    endpoints: (build) => ({
        getRecs: build.query({
            query: (type) => ({
                url:`api/sampleapi/wines?type=${type}`,
                method: 'get',
            })
        })
    })
})

export const {
    useGetRecsQuery
} = recApi
