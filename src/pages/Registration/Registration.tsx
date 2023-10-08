import { useState } from 'react';
import styles from './registration.module.css'
import AuthStore from '../../store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Registration = observer(() => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleRepeatEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatEmail(event.target.value);
    };
    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await AuthStore.registration(email, repeatEmail, login, password, repeatPassword)
        if (AuthStore.token !== "") {
            return navigate("/")
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    return (
        <div className={styles.registration}>
            <h1>Registration</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor='email'>Repeat email</label>
                    <input
                        type='email'
                        id='repeatEmail'
                        value={repeatEmail}
                        onChange={handleRepeatEmailChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor='email'>Login</label>
                    <input
                        type='text'
                        id='login'
                        value={login}
                        onChange={handleLoginChange}
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.inputWithButton}`}>
                    <label htmlFor='email'>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="button" className={styles.showPasswordButton} onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                </div>
                <div className={`${styles.formGroup} ${styles.inputWithButton}`}>
                    <label htmlFor='email'>Repeat password</label>
                    <input
                        type={showRepeatPassword ? 'text' : 'password'}
                        id='repeatPassword'
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                    />
                    <button type="button" className={styles.showPasswordButton} onClick={handleToggleRepeatPasswordVisibility}>
                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Registration
                </button>
            </form>
        </div>
    )
})


export default Registration