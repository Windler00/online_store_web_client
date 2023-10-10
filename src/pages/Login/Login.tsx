import { useState } from "react";
import styles from './login.module.css'
import AuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                <div className={`${styles.formGroup} ${styles.inputWithButton}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="button" className={styles.showPasswordButton} onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Log In
                </button>
            </form>
        </div>
    )
})

export default Login