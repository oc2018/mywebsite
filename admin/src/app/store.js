import { configureStore } from "@reduxjs/toolkit";
import { messagesApi } from "../services/messagesApi";
import { projectsApi } from "../services/projectsApi";
import { userApi } from "../services/userApi";
import { currentUserApi } from "../services/currentUserApi";
import userReducer from "../features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        [ userApi.reducerPath ]: userApi.reducer,
        [ messagesApi.reducerPath]: messagesApi.reducer,
        [ projectsApi.reducerPath]: projectsApi.reducer,
        [ currentUserApi.reducerPath]: currentUserApi.reducer,
        userState: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesApi.middleware, projectsApi.middleware,userApi.middleware,currentUserApi.middleware)
});

setupListeners(store.dispatch); 