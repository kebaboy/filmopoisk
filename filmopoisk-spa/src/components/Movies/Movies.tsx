import { ShortMovieInfo } from "../../constants/types";
import { Movie } from "../Movie/Movie";
import styles from "./Movies.module.css";

interface MoviesProps {
    movies: ShortMovieInfo[];
    style?: React.CSSProperties;
    className?: string;
}

// заранее подгружать фильмы для след страницы пагинации
export const Movies: React.FC<MoviesProps> = ({ movies, style, className }) => {
    return (
        <div className={`${styles.movies} ${className}`} style={style}>
            {movies.map(movie => {
                return <Movie key={movie.id} movie={movie} />
            })}
        </div>
    );
}