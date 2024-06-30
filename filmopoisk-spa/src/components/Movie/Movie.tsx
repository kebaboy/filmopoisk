import { useSelector } from "react-redux";
import { ShortMovieInfo } from "../../constants/types";
import { Rating } from "../Rating/Rating";
import styles from "./Movie.module.css";
import { useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../state/Auth/AuthSlice";
import moviesApi from "../../state/MoviesAPI/MoviesAPI";


export const Movie: React.FC<{ movie: ShortMovieInfo }> = ({ movie }) => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);

    const [rateMovieMutation] = moviesApi.useRateMovieMutation();

    const handleRateMovie = (userRate: number) => {
        localStorage.setItem(`movie-rating-${movie.id}`, userRate.toString());

        rateMovieMutation({ movieId: movie.id, user_rate: userRate });
    };
    return (
        <div className={styles.movie} onClick={() => navigate(`/movie/${movie.id}`)}>
            <img className={styles.movie__poster} src={`${movie.poster}`} alt="movie image" />
            <div className={styles.movie__info}>
                <h3 className={styles.movie__title}>{movie.title}</h3>
                <div className={styles.movie__details}>
                    <p aria-label="genre" className={styles.movie__label}>Жанр</p>
                    <p className={styles.movie__genre}>{movie.genre}</p>
                    <p className={styles.movie__label}>Год выпуска</p>
                    <p>{movie.release_year}</p>
                    <p className={styles.movie__label}>Описание</p>
                    <p>{movie.description}</p>
                </div>
            </div>
            {isAuth && <Rating onChange={handleRateMovie} rating={Number(localStorage.getItem(`movie-rating-${movie.id}`)) || 0}/>}
        </div>
    );
}