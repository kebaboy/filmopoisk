import styles from './UserIcon.module.css';

export const UserIcon = () => {
    return (
        <div className={styles.container}>
            <img src="/user.svg" alt="user" />
        </div>
    );
}