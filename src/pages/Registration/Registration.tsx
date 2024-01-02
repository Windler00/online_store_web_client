import { useState } from 'react';
import AuthStore from '../../store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import Auth from '../../api/AuthApi';

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
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Repeat email</label>
                    <input
                        type='email'
                        id='repeatEmail'
                        value={repeatEmail}
                        onChange={handleRepeatEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Login</label>
                    <input
                        type='text'
                        id='login'
                        value={login}
                        onChange={handleLoginChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <div>
                    <label htmlFor='email'>Repeat password</label>
                    <input
                        type={showRepeatPassword ? 'text' : 'password'}
                        id='repeatPassword'
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                    />
                    <button type="button" onClick={handleToggleRepeatPasswordVisibility}>
                        {showRepeatPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <button type="submit">
                    Registration
                </button>
            </form>
        </div>
    )
})


export default Registration