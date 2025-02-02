import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, setCurrentPage}) => {
    return (
        <div className={styles.pagination}>
            <button className={styles.arrowPrev} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.939983 11.78C0.813317 11.78 0.68665 11.7333 0.58665 11.6333C0.393317 11.44 0.393317 11.12 0.58665 10.9267L4.93332 6.58001C5.25332 6.26001 5.25332 5.74001 4.93332 5.42001L0.58665 1.07335C0.393317 0.880013 0.393317 0.560013 0.58665 0.36668C0.779984 0.173346 1.09998 0.173346 1.29332 0.36668L5.63998 4.71335C5.97998 5.05335 6.17332 5.51335 6.17332 6.00001C6.17332 6.48668 5.98665 6.94668 5.63998 7.28668L1.29332 11.6333C1.19332 11.7267 1.06665 11.78 0.939983 11.78Z" fill="#1B1F23"/>
            </svg>
            </button>
            <p>{currentPage}</p>
            <button className={styles.arrowNext} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.939983 11.78C0.813317 11.78 0.68665 11.7333 0.58665 11.6333C0.393317 11.44 0.393317 11.12 0.58665 10.9267L4.93332 6.58001C5.25332 6.26001 5.25332 5.74001 4.93332 5.42001L0.58665 1.07335C0.393317 0.880013 0.393317 0.560013 0.58665 0.36668C0.779984 0.173346 1.09998 0.173346 1.29332 0.36668L5.63998 4.71335C5.97998 5.05335 6.17332 5.51335 6.17332 6.00001C6.17332 6.48668 5.98665 6.94668 5.63998 7.28668L1.29332 11.6333C1.19332 11.7267 1.06665 11.78 0.939983 11.78Z" fill="#1B1F23"/>
            </svg>
            </button>
        </div>
    );
}