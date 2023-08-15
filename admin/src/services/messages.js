import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api'
    }),
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: (id) => `/msg/${id}`
        }),
        getMessages: builder.query({
            query: () => `/msg`
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
    }),
})

export const { useGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useGetMessageQuery, useDeleteMessageMutation } = messagesApi;