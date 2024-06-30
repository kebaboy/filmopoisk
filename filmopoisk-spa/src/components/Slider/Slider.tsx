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
            const newPosition = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
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
                    &lt;
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
                    &gt;
                </button>
            )}
        </div>
    );
};

export default ActorSlider;
