import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
    isActive: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ( { isActive, onClose, children, title } ) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isActive) {
        return null;
    }

    return createPortal(
        <div className={`${styles.overlay}`} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <header className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    <button style={{backgroundColor: 'transparent', padding: '3px'}} onClick={onClose}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.85372 9.14625C9.90018 9.19271 9.93703 9.24786 9.96217 9.30856C9.98731 9.36925 10.0003 9.43431 10.0003 9.5C10.0003 9.5657 9.98731 9.63076 9.96217 9.69145C9.93703 9.75215 9.90018 9.8073 9.85372 9.85375C9.80727 9.90021 9.75212 9.93706 9.69142 9.9622C9.63072 9.98734 9.56567 10.0003 9.49997 10.0003C9.43428 10.0003 9.36922 9.98734 9.30853 9.9622C9.24783 9.93706 9.19268 9.90021 9.14622 9.85375L4.99997 5.70688L0.853723 9.85375C0.759902 9.94757 0.632655 10.0003 0.499973 10.0003C0.367291 10.0003 0.240043 9.94757 0.146223 9.85375C0.0524025 9.75993 -0.000305173 9.63269 -0.000305176 9.5C-0.000305178 9.36732 0.0524025 9.24007 0.146223 9.14625L4.2931 5L0.146223 0.853753C0.0524025 0.759933 -0.000305176 0.632685 -0.000305176 0.500003C-0.000305176 0.367321 0.0524025 0.240074 0.146223 0.146253C0.240043 0.052433 0.367291 -0.000274658 0.499973 -0.000274658C0.632655 -0.000274658 0.759902 0.052433 0.853723 0.146253L4.99997 4.29313L9.14622 0.146253C9.24004 0.052433 9.36729 -0.000274661 9.49997 -0.000274658C9.63266 -0.000274656 9.7599 0.052433 9.85372 0.146253C9.94754 0.240074 10.0003 0.367321 10.0003 0.500003C10.0003 0.632685 9.94754 0.759933 9.85372 0.853753L5.70685 5L9.85372 9.14625Z" fill="#ABABAB"/>
                        </svg>
                    </button>
                </header>
                {children}
            </div>
        </div>,
    document.body);
}