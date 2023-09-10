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
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        autoComplete="username"
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
})

export default Login