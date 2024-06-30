import { useParams } from "react-router-dom";
import styles from './MoviePage.module.css';
import { Rating } from "../../components/Rating/Rating";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../state/Auth/AuthSlice";
import moviesApi from "../../state/MoviesAPI/MoviesAPI";
import { capitalizeFirstLetter } from "../../utils/utils";
import ActorSlider from "../../components/Slider/Slider";

export const MoviePage = () => {
    const { movieId = '' } = useParams<{ movieId: string }>();
    const { data: movie, isLoading } = moviesApi.useGetMovieByIdQuery(movieId);
    const [rateMovieMutation] = moviesApi.useRateMovieMutation();
    const isAuth = useSelector(selectIsAuth);

    const handleRateMovie = (userRate: number) => {
        localStorage.setItem(`movie-rating-${movieId}`, userRate?.toString());

        rateMovieMutation({ movieId: movieId!, user_rate: userRate });
    };

    if (isLoading) {
        return (
            <div className={styles.info}>
                <div className={styles.infoTitle}>Загрузка</div>
                <div className={styles.infoText}>Пожалуйста, подождите...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className={styles.info}>
                <div className={styles.infoTitle}>Фильма не существует</div>
                <div className={styles.infoText}>Пожалуйста, выберете другой фильм</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <section className={styles.movie}>
                <img className={styles.poster} src={`${movie.poster}`} alt="movie image" />
                <div className={styles.movieInfo}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{movie.title}</h2>
                        {isAuth && <Rating onChange={handleRateMovie} rating={Number(localStorage.getItem(`movie-rating-${movieId}`)) || 0}/>}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.detail}>
                            <p><span>Жанр:</span></p>
                            <p>{capitalizeFirstLetter(movie.genre)}</p>
                        </div>
                        <div className={styles.detail}>
                            <p><span>Год выпуска:</span></p>
                            <p>{movie.release_year}</p>
                        </div>
                        <div className={styles.detail}>
                            <p><span>Рейтинг:</span></p>
                            <p>{movie.rating}</p>
                        </div>
                        <div className={styles.detail}>
                            <p><span>Описание</span></p>
                            <p>{movie.description}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className={styles.actorsTitle}>Актеры</h2>
                <ActorSlider actors={[...movie.actors, ...movie.actors, ...movie.actors, ...movie.actors]} />
            </section>
        </div>
    );
}