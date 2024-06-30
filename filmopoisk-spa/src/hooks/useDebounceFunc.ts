import { useEffect, useState, useCallback } from "react";

const useDebounce = (callback: Function, delay: number = 500): Function => {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const debouncedCallback = useCallback(
        (...args: any[]) => {
            if (timer) {
                clearTimeout(timer);
            }
            const newTimer = setTimeout(() => {
                callback(...args);
            }, delay);
            setTimer(newTimer);
        },
        [callback, delay, timer]
    );

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return debouncedCallback;
};

export default useDebounce;
