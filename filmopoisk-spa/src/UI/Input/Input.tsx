import styles from "./Input.module.css";

// не писать для каждого пропса!
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
const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input style={props.style} className={`${styles.input} ${className}`} {...props}></input>
    )
}

export default Input;
