import { useEffect, useReducer, useState } from "react";
import { GENRES, YEARS } from "../../constants/constants";
import { MoviesFilter } from "../../components/MoviesFilter/MoviesFilter";
import styles from '../MainPage/MainPage.module.css'
import { Movies } from "../../components/Movies/Movies";
import { Pagination } from "../../UI/Pagination/Pagination";
import { moviesApi } from "../../state/MoviesAPI/MoviesAPI";
import { getKeyByValue } from "../../utils/utils";
import useDebounceValue from "../../hooks/useDebounceValue";
import { Loader } from "../../UI/Loader/Loader";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useSearchParams } from "react-router-dom";

interface SearchParams {
    search: string;
    genre: keyof typeof GENRES | '0';
    year: keyof typeof YEARS | '0';
    currentPage: number;
}

// type Action =
//     | { type: 'setSearch'; payload: string }
//     | { type: 'setGenre'; payload: keyof typeof GENRES | '0' }
//     | { type: 'setYear'; payload: keyof typeof YEARS | '0' }
//     | { type: 'setCurrentPage'; payload: number }
//     | { type: 'reset' };

const reducer = (state: SearchParams, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case 'setSearch':
            return { ...state, search: action.payload, currentPage: 1 };
        case 'setGenre':
            return { ...state, genre: action.payload, currentPage: 1 };
        case 'setYear':
            return { ...state, year: action.payload, currentPage: 1 };
        case 'setCurrentPage':
            return { ...state, currentPage: action.payload };;
        case 'reset':
            return { ...state, search: '', genre: '0', year: '0', currentPage: 1 };
        default:
            return state;
    }
}

export const MainPage: React.FC = () => {
    const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();
    const [searchParams, dispatch] = useReducer(reducer, {
        search: searchParamsUrl.get('search') || '',
        genre: searchParamsUrl.get('genre') || '0',
        year: searchParamsUrl.get('year') || '0',
        currentPage: Number(searchParamsUrl.get('page')) || 1,
    });
    const { search, genre, year, currentPage } = searchParams;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSearchParamsUrl({ search, genre, year, page: currentPage.toString() });
    }, [search, genre, year, currentPage, setSearchParamsUrl]);;
    
    const debouncedSearch = useDebounceValue(search);

    const { searchResults, totalPages, isLoading, isFetching } = moviesApi.useGetMoviesQuery(
        {page: currentPage, title: debouncedSearch, genre, release_year: year}, 
        {
            selectFromResult: (result) => ({
                ...result,
                searchResults: result.data?.search_result || [],
                totalPages: result.data?.total_pages || 0,
            }),
            skip: debouncedSearch !== search,
        }
    );


    useEffect(() => {
        if (debouncedSearch !== search) setLoading(true);
        else setLoading(false);
    }, [search, debouncedSearch]);

    return (
        <div className={styles.container}>
            <MoviesFilter filter={{ genre, year }} genres={Object.values(GENRES)} years={Object.values(YEARS)} onGenreChange={(option) =>dispatch({ type: 'setGenre', payload: getKeyByValue(GENRES, option)})} onYearChange={(option) => dispatch({ type: 'setYear', payload: getKeyByValue(YEARS, option) })}/>
            <div className={styles.movies}>
                <SearchInput className={styles.search} placeholder="Название фильма" value={search} onChange={(event) => dispatch({ type: 'setSearch', payload: event.target.value })}/>
                    {isLoading
                        ? <div className={styles.info}>
                            <div className={styles.infoTitle}>Загрузка фильмов</div>
                            <div className={styles.infoText}>Пожалуйста, подождите...</div>
                        </div>
                        : isFetching || loading
                            ? <div className={styles.info}>
                                <Loader />
                            </div>
                            : <>
                                {searchResults.length 
                                    ? <Movies className={styles.list} movies={searchResults} />
                                    : <div className={styles.info}>
                                        <div className={styles.infoTitle}>Фильмы не найдены</div>
                                        <div className={styles.infoText}>Измените запрос и попробуйте снова</div>
                                    </div>}
                                {!!totalPages && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={(page) => dispatch({ type: 'setCurrentPage', payload: page })} />}
                            </> }
            </div>
        </div>
    )
}