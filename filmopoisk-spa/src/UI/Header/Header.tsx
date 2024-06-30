import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Header.module.css";
import { Modal } from "../../components/Modal/Modal";
import { AuthorizationForm } from "../../components/AuthorizationForm/AuthorizationForm";
import { logout, selectIsAuth, checkIsAuth } from "../../state/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "../../components/UserIcon/UserIcon";

interface HeaderProps {
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = () => {
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(checkIsAuth());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Фильмопоиск</h1>
            {isAuth
                ? <div className={styles.logout}>
                    <UserIcon />
                    <Button variant="secondary" onClick={handleLogout}>Выйти</Button>
                    </div>
                : <Button onClick={() => setIsVisible(true)}>Войти</Button>
            }
            {isVisible && 
                <Modal title="Авторизация" isActive={isVisible} onClose={() => setIsVisible(false)}>
                    <AuthorizationForm onClose={() => setIsVisible(false)}/>
                </Modal>
            }
        </header>
    );
}