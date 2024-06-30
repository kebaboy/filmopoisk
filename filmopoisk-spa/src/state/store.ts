import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth/AuthSlice";
import { moviesApi } from "./MoviesAPI/MoviesAPI";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;