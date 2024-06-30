import { GENRES } from "./constants";

export type GenresEnglish = keyof typeof GENRES; 
export type GenresRussian = typeof GENRES[GenresEnglish];

export type Actor = {
    name: string;
    photo: string; // base64 img
}

export type FullMovieInfo = {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string; //base64 img
    genre: string;
    rating: string; //float
    total_rates_count: string; //int
    actors: Actor[];
}

export type ShortMovieInfo = Omit<FullMovieInfo, "actors" | "total_rates_count">;

export type User = {
    username: string;
    password: string;
};

export type SearchMoviesResponse = {
    search_result: ShortMovieInfo[];
    total_pages: number;
}

export type LoginResponse = {
    token: string;
}