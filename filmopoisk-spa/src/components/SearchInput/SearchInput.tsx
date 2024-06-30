import { useState } from 'react';
import Input from '../../UI/Input/Input';
import styles from './SearchInput.module.css';

interface InputProps {
    style?: React.CSSProperties;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    type?: string;
    id ?: string;
    required?: boolean;
}
const SearchInput: React.FC<InputProps> = ({ className, onChange, value, ...props }) => {
    const [searchValue, setSearchValue] = useState(value);
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        if (onChange) onChange(event);
    }
    return (
        <div className={`${styles.container} ${className}`}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.833252 7.66671C0.833252 11.4334 3.89992 14.5 7.66659 14.5C11.4333 14.5 14.4999 11.4334 14.4999 7.66671C14.4999 3.90004 11.4333 0.833374 7.66659 0.833374C3.89992 0.833374 0.833252 3.90004 0.833252 7.66671ZM1.83325 7.66671C1.83325 4.45337 4.44659 1.83337 7.66659 1.83337C10.8866 1.83337 13.4999 4.45337 13.4999 7.66671C13.4999 10.88 10.8866 13.5 7.66659 13.5C4.44659 13.5 1.83325 10.88 1.83325 7.66671ZM14.3132 15.02C14.4132 15.12 14.5399 15.1666 14.6666 15.1666C14.7932 15.1666 14.9199 15.12 15.0199 15.02C15.2132 14.8266 15.2132 14.5066 15.0199 14.3133L13.6866 12.98C13.4932 12.7866 13.1732 12.7866 12.9799 12.98C12.7866 13.1733 12.7866 13.4933 12.9799 13.6866L14.3132 15.02Z" fill="#999FA6"/>
            </svg>
            <Input style={{ paddingLeft: '36px', paddingRight: '36px' }} value={searchValue} onChange={onInputChange} {...props}></Input>
            {searchValue && <svg onClick={() => {setSearchValue(''); if (onChange) onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}} className={styles.clear} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 15.1667C4.04659 15.1667 0.833252 11.9534 0.833252 8.00004C0.833252 4.04671 4.04659 0.833374 7.99992 0.833374C11.9533 0.833374 15.1666 4.04671 15.1666 8.00004C15.1666 11.9534 11.9533 15.1667 7.99992 15.1667ZM7.99992 1.83337C4.59992 1.83337 1.83325 4.60004 1.83325 8.00004C1.83325 11.4 4.59992 14.1667 7.99992 14.1667C11.3999 14.1667 14.1666 11.4 14.1666 8.00004C14.1666 4.60004 11.3999 1.83337 7.99992 1.83337ZM6.11325 10.3867C5.98658 10.3867 5.85991 10.34 5.75991 10.24C5.56658 10.0467 5.56658 9.72666 5.75991 9.53332L7.29325 7.99999L5.75991 6.46666C5.56658 6.27332 5.56658 5.95332 5.75991 5.75999C5.95325 5.56666 6.27325 5.56666 6.46658 5.75999L7.99991 7.29332L9.53325 5.75999C9.72658 5.56666 10.0466 5.56666 10.2399 5.75999C10.4332 5.95332 10.4332 6.27332 10.2399 6.46666L8.70658 7.99999L10.2399 9.53332C10.4332 9.72666 10.4332 10.0467 10.2399 10.24C10.1399 10.34 10.0132 10.3867 9.88658 10.3867C9.75991 10.3867 9.63325 10.34 9.53325 10.24L7.99991 8.70666L6.46658 10.24C6.37325 10.34 6.23991 10.3867 6.11325 10.3867Z" fill="#999FA6"/>
            </svg>}
        </div>
    )
}

export default SearchInput;