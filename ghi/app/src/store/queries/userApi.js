import { findNonSerializableValue } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { authApi, useGetTokenQuery } from "./authApi";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/users",
        prepareHeaders: (headers, {getState}) => {
            const selector = authApi.endpoints.getToken.select()
            const {data: token_data} = selector(getState())
            if (token_data) {
                headers.set("Authorization", `Bearer ${token_data.access_token}`)
            }
            return headers
        }

    }),
    tagTypes: ["user", "token"],

    endpoints: build => ({
        getUsers: build.query({
            query: () => ({
                url: "",
                credentials: "include",
            })
        }),
        createUser: build.mutation({
            query: (data) => {
                return {
                    url: "",
                    method: "post",
                    body: data
                }
            }
        }),
        updateUser: build.mutation({
            query: (data, user_id) => {
                return {
                    url: `/${user_id}`,
                    method: "put",
                    body: data
                }
            }

        }),
        invalidateTags: ["token"], //results variable malcolm was talking about
        provideTags: ["token"]
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = userApi
