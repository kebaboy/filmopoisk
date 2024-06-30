import { useEffect, useReducer, useState } from "react";
import { GENRES, YEARS } from "../../constants/constants";
import { MoviesFilter } from "../../components/MoviesFilter/MoviesFilter";
import styles from '../MainPage/MainPage.module.css'
import { Movies } from "../../components/Movies/Movies";
import { Pagination } from "../../UI/Pagination/Pagination";
import { moviesApi } from "../../state/MoviesAPI/MoviesAPI";
import { getKeyByValue } from "../../utils/utils";
import useDebounce from "../../hooks/useDebounce";
import { Loader } from "../../UI/Loader/Loader";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useSearchParams } from "react-router-dom";

interface SearchParams {
    search: string;
    genre: string;
    year: string;
    currentPage: number;
}

const initialState = {
    search: '',
    genre: '0',
    year: '0',
    currentPage: 1,
}

const reducer = (state: SearchParams, action: { type: string; payload: any }): SearchParams => {
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
            return { ...state, search: '', genre: '0', year: '0' };
        default:
            return state;
    }
}

export const MainPage: React.FC = () => {
    const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();

    useEffect(() => {
        if (searchParamsUrl.get('search')) {
            dispatch({ type: 'setSearch', payload: searchParamsUrl.get('search') || '' });
        }
        if (searchParamsUrl.get('genre')) {
            dispatch({ type: 'setGenre', payload: searchParamsUrl.get('genre') || '0' });
        }
        if (searchParamsUrl.get('year')) {
            dispatch({ type: 'setYear', payload: searchParamsUrl.get('year') || '0' });
        }
        if (searchParamsUrl.get('page')) {
            dispatch({ type: 'setCurrentPage', payload: Number(searchParamsUrl.get('page')) || 1 });
        }
    }, []);

    const [searchParams, dispatch] = useReducer(reducer, initialState);
    const { search, genre, year, currentPage } = searchParams;


    useEffect(() => {
        setSearchParamsUrl({ search, genre, year, page: currentPage.toString() });
    }, [search, genre, year, currentPage, setSearchParamsUrl]);



    const [loading, setLoading] = useState(false);
    const debouncedSearch = useDebounce(search);

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
            <MoviesFilter genres={Object.values(GENRES)} years={Object.values(YEARS)} onGenreChange={(option) =>dispatch({ type: 'setGenre', payload: getKeyByValue(GENRES, option)})} onYearChange={(option) => dispatch({ type: 'setYear', payload: getKeyByValue(YEARS, option) })}/>
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