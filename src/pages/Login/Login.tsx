import { useState } from "react";
import AuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Auth from "../../api/AuthApi";
import styles from "./login.module.css"

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
        await Auth.login(email, password)
        if (AuthStore.token !== "") {
            return navigate("/")
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.Login}>
            <h1>Login</h1>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.FormGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="form-control m-1"
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="form-control m-1"
                    />
                    <button className={styles.showPasswordButton} type="button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>
                <button className="btn btn-dark" type="submit">
                    Log In
                </button>
            </form>
        </div>
    )
})

export default Login