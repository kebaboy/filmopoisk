import { Select } from "../../UI/Select/Select";
import styles from "./MoviesFilter.module.css";
import { GENRES, YEARS } from "../../constants/constants";

interface MoviesFilterProps {
    genres: typeof GENRES[keyof typeof GENRES][];
    years: typeof YEARS[keyof typeof YEARS][];
    onYearChange: (value: keyof typeof YEARS) => void;
    onGenreChange: (value: keyof typeof GENRES) => void;
    filter: {
        genre: keyof typeof GENRES;
        year: keyof typeof YEARS;
    }
}

export const MoviesFilter: React.FC<MoviesFilterProps> = ({ genres, years, onYearChange, onGenreChange, filter }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Фильтр</h3>
            <div className={styles.filters}>
                <div className={styles.filter}>
                    <p className={styles.label}>Жанр</p>
                    <Select onChange={onGenreChange} style={{minWidth: '360px'}} options={genres} placeholder={'Выберите жанр'} value={GENRES[filter.genre]} />
                </div>
                <div>
                    <p className={styles.label}>Год выпуска</p>
                    <Select onChange={onYearChange} style={{minWidth: '360px'}} options={years} placeholder={'Выберите год'} value={YEARS[filter.year]} />
                </div>
            </div>
        </div>
    );
}