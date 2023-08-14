import { useState } from 'react';
import styles from './registration.module.css'
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';

export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className={styles.registration}>
            <div className={styles.field}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <TextField
                    label="Repeat password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}