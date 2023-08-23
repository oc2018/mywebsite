import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseURL } from "../util/backendUrl";

import { currentUserApi } from "./currentUserApi";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/users`
        }),
        signUp: builder.mutation({
            query: (FormData) => ({
                url: `/users/signup`,
                method: 'POST',
                body: FormData
            })
        }),
        verifyEmail: builder.mutation({
            query: ({ verificationCode }) => ({
                url: `/users/verify${verificationCode}`,
                method: 'GET',
            })
        }),
        signIn: builder.mutation({
            query: (FormData) => ({
                url: `/users/signin`,
                method: 'POST',
                body: FormData
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('UserData', JSON.stringify({ ...data }));
                    await dispatch(currentUserApi.endpoints.getMe.initiate(data.user.id));
                } catch (error) {
                    console.error(error)
                }
            },
        }),
        updateUser: builder.mutation({
            query: (id, FormData) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: FormData
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetUsersQuery, useSignUpMutation, useSignInMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi