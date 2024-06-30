import { useEffect, useReducer, useState } from 'react';
import { Button } from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import styles from './AuthorizationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/Auth/AuthSlice';
import { User } from '../../constants/types';
import { AppDispatch, RootState } from '../../state/store';

const initialState: User = {
    username: '',
    password: '',
}
const reducer = (state: typeof initialState, { type, payload } : { type: string, payload: string }) => {
    switch (type) {
        case 'setLogin':
            return { ...state, username: payload };
        case 'setPassword':
            return { ...state, password: payload };
        case 'reset':
            return initialState;
        default:
            return state;
    }
};

interface AuthorizationFormProps {
    onClose: () => void
}

export const AuthorizationForm: React.FC<AuthorizationFormProps> = ({ onClose }) => {
    const [form, formDispatch] = useReducer(reducer, initialState);
    const [validateErrors, setValidateErrors] = useState({ username: false, password: false });
    const authDispatch = useDispatch<AppDispatch>();
    const { status } = useSelector((state: RootState) => state.auth);

    const handleSubmit = (event:  React.MouseEvent<HTMLButtonElement>): void => {
        const newErrors = {
            username: form.username.trim() === '',
            password: form.password.trim() === ''
        };

        setValidateErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
            authDispatch(login({ username: form.username, password: form.password }));
        }
    }

    useEffect(() => {
        formDispatch({ type: 'reset', payload: '' });
    }, []);

    useEffect(() => {
        if (status === 'succeeded') {
            onClose();
        }
    }, [status, onClose]);

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div>
                    <label className={styles.label} htmlFor="login">Логин <span className={styles.accent}>*</span></label>
                    <Input className={`${validateErrors.username && !form.username ? styles.accentBorder : styles.input}`} type="text" id="login" placeholder="Логин" value={form.username} onChange={(event) => formDispatch({ type: 'setLogin', payload: event.target.value })}/>
                </div>
                <div>
                    <label className={styles.label} htmlFor="password">Пароль <span className={styles.accent}>*</span></label>
                    <Input className={`${validateErrors.password && !form.password ? styles.accentBorder : styles.input}`} type="password" id="password" placeholder="Пароль" value={form.password} onChange={(event) => formDispatch({ type: 'setPassword', payload: event.target.value })}/>
                </div>
                {status === 'failed' && <div className={styles.accent}>Ошибка авторизации</div>}
            </form>
            <div className={styles.buttons}>
                <Button onClick={handleSubmit}>Войти</Button>
                <Button onClick={onClose} variant='secondary'>Отменить</Button>
            </div>
        </div>
    );
}