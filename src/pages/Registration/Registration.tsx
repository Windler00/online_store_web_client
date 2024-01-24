import { useState } from 'react';
import AuthStore from '../../store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import Auth from '../../api/AuthApi';
import styles from "./registration.module.css"

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
        await Auth.registration(email, repeatEmail, login, password, repeatPassword)
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
        <div className={styles.Registration}>
            <h1>Registration</h1>
            <form className={styles.From} onSubmit={handleSubmit}>
                <div className={styles.FormGroup}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                        className='form-control m-1'
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor='email'>Repeat email</label>
                    <input
                        type='email'
                        id='repeatEmail'
                        value={repeatEmail}
                        onChange={handleRepeatEmailChange}
                        className='form-control m-1'
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor='email'>Login</label>
                    <input
                        type='text'
                        id='login'
                        value={login}
                        onChange={handleLoginChange}
                        className='form-control m-1'
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor='email'>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}
                        className='form-control m-1'
                    />
                    <button className={styles.showPasswordButton} type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor='email'>Repeat password</label>
                    <input
                        type={showRepeatPassword ? 'text' : 'password'}
                        id='repeatPassword'
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                        className='form-control m-1'
                    />
                    <button className={styles.showPasswordButton} type="button" onClick={handleToggleRepeatPasswordVisibility}>
                        {showRepeatPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <button className='btn btn-dark' type="submit">
                    Registration
                </button>
            </form>
        </div>
    )
})


export default Registration