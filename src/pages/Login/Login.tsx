import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import { useState } from "react";
import styles from './login.module.css'
import AuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Login = observer(() => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await AuthStore.login(email, password)
        if (AuthStore.token !== "") {
            return navigate("/")
        }
    };
    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Log In
                </button>
            </form>
        </div>
    )
})

export default Login