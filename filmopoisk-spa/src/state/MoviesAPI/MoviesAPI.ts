import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../constants/constants";
import { FullMovieInfo, SearchMoviesResponse, User } from "../../constants/types";

export const moviesApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/v1` }),
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        getMovies: builder.query<SearchMoviesResponse, { page?: number, title?: string, genre?: string, release_year?: string }>({
            query: ({ page, title, genre, release_year }) => {
                const params = new URLSearchParams();
                if (page) {
                    params.append('page', page.toString());
                }
                if (title) {
                    params.append('title', title);
                }
                if (genre &&genre !== '0') {
                    params.append('genre', genre);
                }
                if (release_year && release_year !== '0') {
                    params.append('release_year', release_year);
                }
                return `/search?${params.toString()}`;
            },
        }),
        getMovieById: builder.query<FullMovieInfo, string>({
            query: (id) => `/movie/${id}`,
            providesTags: (result) =>
                result
                    ? [{ type: 'Movie', id: result.id }]
                    : ['Movie'],
        }),
        rateMovie: builder.mutation<{ token: string }, { movieId: string, user_rate: number }>({
            query: ({ movieId, user_rate }) => ({
                url: `/rateMovie`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: { movieId, user_rate },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Movie', id: arg.movieId }],
        }),
        login: builder.mutation({ 
            query: (credentials: User) => ({ 
                url: '/login', 
                method: 'POST', 
                body: credentials, 
            }), 
        }), 
    }), 
})

export default moviesApi;
