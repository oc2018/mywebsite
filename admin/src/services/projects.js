import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/api`,
    }),
    endpoints: (builder) => ({
        getProject: builder.query({
            query: ( id ) => `/project/${ id }`, 
        }),

        getProjects: builder.query({
            query: () => `/project`
        }),

        createProject: builder.mutation({
            query: ( formData ) => ({
                url: `/project`,
                method: 'POST',
                body: formData,
            }),
        }),

        updateProject: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/project/${id}`,
                method: 'PATCH',
                body: formData,
            }),
        }),
        
        deleteProject: builder.mutation({
            query: ( id ) => ({
                url: `/project/${id}`,
                method: 'DELETE',
            })
        })
    }),
});

export const { useGetProjectsQuery, useGetProjectQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = projectsApi;