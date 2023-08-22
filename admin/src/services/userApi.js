import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseURL } from "../util/backendUrl";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/user`
        }),
        signUp: builder.mutation({
            query: (FormData) => ({
                url: `/user/signup`,
                method: 'POST',
                body: FormData
            })
        }),
        signIn: builder.mutation({
            url: `/user/signin`,
            method: 'POST',
            body: FormData
        }),
        updateUser: builder.mutation({
            query: (id, FormData) => ({
                url: `/user/${id}`,
                method: 'PATCH',
                body: FormData
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE'
            })
        }),
        // async onQueryStarted(args, { queryFulfilled }) {
        //     try {
        //         const data = await queryFulfilled;
        //         console.log(data)
        //         // await dispatch(userApi.endpoints.getUsers.initiate(null));
        //     } catch (error) {
        //         console.error('error')
        //     }
        // }
    })
})

export const { useGetUsersQuery, useSignUpMutation, useSignInMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi