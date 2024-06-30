import React, { useRef, useState, useEffect } from 'react';
import ActorCard from '../Actor/Actor';
import styles from './Slider.module.css';
import { Actor } from '../../constants/types';

interface ActorSliderProps {
    actors: Actor[];
}

const ActorSlider: React.FC<ActorSliderProps> = ({ actors }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [showArrows, setShowArrows] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updateArrowsVisibility = () => {
            if (sliderRef.current) {
                const { scrollWidth, clientWidth } = sliderRef.current;
                setShowArrows(scrollWidth > clientWidth);
            }
        };

        updateArrowsVisibility();
        window.addEventListener('resize', updateArrowsVisibility);

        return () => {
            window.removeEventListener('resize', updateArrowsVisibility);
        };
    }, [actors]);

    const handleScroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const newPosition = direction === 'left' ? scrollLeft - 140 : scrollLeft + 140;
            sliderRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className={styles.actorSliderContainer}>
            {showArrows && (
                <button
                    className={styles.arrowLeft}
                    onClick={() => handleScroll('left')}
                    disabled={scrollPosition <= 0}
                >
                    <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.87997 23.56C1.62663 23.56 1.3733 23.4667 1.1733 23.2667C0.786634 22.88 0.786634 22.24 1.1733 21.8534L9.86663 13.16C10.5066 12.52 10.5066 11.48 9.86663 10.84L1.1733 2.14669C0.786634 1.76003 0.786634 1.12003 1.1733 0.733359C1.55997 0.346693 2.19997 0.346693 2.58663 0.733359L11.28 9.42669C11.96 10.1067 12.3466 11.0267 12.3466 12C12.3466 12.9734 11.9733 13.8934 11.28 14.5734L2.58663 23.2667C2.38663 23.4534 2.1333 23.56 1.87997 23.56Z" fill="#ABABAB"/>
                    </svg>
                </button>
            )}
            <div className={styles.actorSlider} ref={sliderRef}>
                {actors.map((actor, index) => (
                    <ActorCard key={index} actor={actor} />
                ))}
            </div>
            {showArrows && (
                <button
                    className={styles.arrowRight}
                    onClick={() => handleScroll('right')}
                    disabled={sliderRef.current ? scrollPosition >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth : false}
                >
                    <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.87997 23.56C1.62663 23.56 1.3733 23.4667 1.1733 23.2667C0.786634 22.88 0.786634 22.24 1.1733 21.8534L9.86663 13.16C10.5066 12.52 10.5066 11.48 9.86663 10.84L1.1733 2.14669C0.786634 1.76003 0.786634 1.12003 1.1733 0.733359C1.55997 0.346693 2.19997 0.346693 2.58663 0.733359L11.28 9.42669C11.96 10.1067 12.3466 11.0267 12.3466 12C12.3466 12.9734 11.9733 13.8934 11.28 14.5734L2.58663 23.2667C2.38663 23.4534 2.1333 23.56 1.87997 23.56Z" fill="#ABABAB"/>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ActorSlider;
