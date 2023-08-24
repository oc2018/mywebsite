import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../util/backendUrl';
// import env from 'dotenv';
// env.config();

// const baseURL = process.env.SERVER_ENDPOINT

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers ) => {
            headers.set("authorization",`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`);
            // console.log('Headers', headers);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: (id) => `/msg/${id}`
        }),
        getMessages: builder.query({
            query: () => `/msg`,
            // prepareHeaders: (headers ) => {
            //     headers.set("Authorization",`Bearer ${JSON.parse(localStorage.getItem('profile'))}`);
            //     console.log('user',JSON.parse(localStorage.getItem('profile').user));
            //     return headers;
            // },
        }),
        createMessage: builder.mutation({
            query: (formData) => ({
                url: `/msg`,
                method: 'POST',
                body: formData,
            })
        }),
        updateMessage: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/msg/${ id }`,
                method: 'PATCH',
                body: formData,
            }),
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/msg/${ id }`,
                method: 'DELETE',
            }),
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled}) {
            try {
                await queryFulfilled;
                await dispatch(messagesApi.endpoints.getMessages.initiate());
            } catch (error) {
                console.log(error);
            }
        },
    }),
})

export const { useGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useGetMessageQuery, useDeleteMessageMutation } = messagesApi;