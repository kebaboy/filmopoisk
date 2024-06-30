import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({children, variant = 'primary', ...props}) => {
    const className = `${styles.button} ${variant === 'primary' ? styles.primaryButton : styles.secondaryButton}`;

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
}