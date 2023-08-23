import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseURL } from "../util/backendUrl";
import { setUser } from "../features/authSlice";


export const currentUserApi = createApi({
    reducerPath: `currentUserApi`,
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    tagTypes: ['User'],
    endpoints: builder => ({
        getMe: builder.query({
            query: (id) => `/users/${ id }`,
            // transformResponse: (result) => result.data,
            async onQueryStarted( args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // console.log(data);
                    dispatch(setUser(data));
                } catch (error) {
                    console.error(error);
                }
            }
        }),
    }),
})

// export const { useGetMeQuery } = currentUserApi