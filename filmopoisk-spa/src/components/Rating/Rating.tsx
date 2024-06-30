import { useState } from 'react';
import styles from './Rating.module.css';
import { FilledStar } from '../Star/FilledStar';
import { UnfilledStar } from '../Star/UnfilledStar';
import useDebounceFunc from '../../hooks/useDebounceFunc';

interface RatingProps {
    totalCount?: number;
    rating?: number;
    onChange?: (rating: number) => void;
}


export const Rating: React.FC<RatingProps> = ({ rating = 0, onChange, totalCount = 5 }) => {
    const [curRate, setCurRate] = useState(rating);
    const [curHover, setCurHover] = useState(-1);

    const debouncedOnChange = useDebounceFunc((rate: number) => {
        if (onChange && rate !== curRate) {
            onChange(rate);
        }
    }, 500);
    
    function handleMouseEnter(index: number) {
        setCurHover(index);
    }

    function handleMouseLeave() {
        setCurHover(-1);
    }

    function handleClick(rate: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        setCurRate(rate);
        debouncedOnChange(rate);
    }

    return (
        <div className={styles.container}>
            {Array.from({ length: totalCount }, (_, index) => (
                <div
                    key={index}
                    className={styles.star}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={(event) => handleClick(index+1, event)}
                >
                    { curHover !== -1
                        ? index <= curHover ? <><FilledStar /><div>{index+1}</div></>  : <><UnfilledStar /><div>{index+1}</div></>
                        : curRate 
                            ? index < curRate ? <><FilledStar isActive/><div style={{color: 'black'}}>{index+1}</div></> : <><UnfilledStar /><div>{index+1}</div></>
                            : <><UnfilledStar /><div>{index+1}</div></>
                    }
                </div>
            ))}
        </div>
    );
}