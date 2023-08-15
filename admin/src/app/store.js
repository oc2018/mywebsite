import { configureStore } from "@reduxjs/toolkit";
import { messagesApi } from "../services/messages";
import { projectsApi } from "../services/projects";

export const store = configureStore({
    reducer: {
        [ messagesApi.reducerPath]: messagesApi.reducer,
        [ projectsApi.reducerPath]: projectsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesApi.middleware, projectsApi.middleware)
});