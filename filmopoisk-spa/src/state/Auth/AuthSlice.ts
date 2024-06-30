import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../constants/types";
import { RootState } from "../store";
import { SERVER_URL } from "../../constants/constants";

export interface AuthState {
    isAuth: boolean;
    token: string | null;
    status: 'loading' | 'idle' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    isAuth: false,
    token: null,
    status: 'idle',
    error: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        checkIsAuth(state) {
            const token = localStorage.getItem('token');
            if (token) {
                state.isAuth = true;
                state.token = token;
            }
        },
        logout(state) {
            state.token = null;
            state.isAuth = false;
            state.status = 'idle';
            localStorage.removeItem("token");

            const movieRatings = Object.keys(localStorage).filter(key => key.startsWith('movie-rating-'));
            movieRatings.forEach(key => {
                localStorage.removeItem(key);
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload;
            state.isAuth = true;
            localStorage.setItem('token', action.payload);
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string || null;
        })
    }
})

export const login = createAsyncThunk<string, { username: string; password: string }, { rejectValue: string }>(
    "auth/login",
    async({ username, password }: User, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_URL}/api/v1/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.error) {
                return rejectWithValue(data.error);
            }
            return data.token;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    },
)

export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const { checkIsAuth, logout } = authSlice.actions;
