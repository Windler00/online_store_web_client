import { useState } from 'react';
import styles from './registration.module.css'
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import AuthStore from '../../store/AuthStore';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const Registration = observer(() => {
    let navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleRepeatEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatEmail(event.target.value);
    };
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handlePasswordRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await AuthStore.registration(email, repeatEmail,username, password, repeatPassword)
        if(AuthStore.token !== ""){
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
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        autoComplete="email"
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        label="Email confirmation"
                        type="email"
                        autoComplete="email"
                        value={repeatEmail}
                        onChange={handleRepeatEmailChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        label="Username"
                        type='username'
                        autoComplete='username'
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        label="Password confirmation"
                        type={showRepeatPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={repeatPassword}
                        onChange={handlePasswordRepeatChange}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleRepeatPasswordVisibility}>
                                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className={styles.field}>
                    <Button variant="contained" color="primary" type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
})


export default Registration