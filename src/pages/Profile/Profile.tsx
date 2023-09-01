import { observer } from "mobx-react-lite";
import styles from './profile.module.css'
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Profile = observer(() => {
    let navigate = useNavigate();
    useEffect(() => {
        if (AuthStore.token === "") {
            return navigate("/login")
        }
    })
    const [email, setEmail] = useState('');
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleSubmitEmail = (event: any) => {
        event.preventDefault();
        AuthStore.changeEmail(email)
    };

    const [name, setName] = useState('');
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handleSubmitName = (event: any) => {
        event.preventDefault();
        AuthStore.changeName(name)
    };
    return (
        <div className={styles.profile}>
            <div className={styles.ProfileInfo}>
                <Typography variant="h5" component="div">
                    {AuthStore.email}
                </Typography>
                <Typography variant="h5" component="div">
                    {AuthStore.name}
                </Typography>
            </div>

            <div className={styles.ProfileChange}>
                <div className={styles.field}>
                    <TextField
                        label="Change email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    >
                    </TextField>
                </div>
                <div className={styles.field}>
                    <Button variant="contained" color="primary" onClick={handleSubmitEmail}>Submit</Button>
                </div>

                <div className={styles.field}>
                    <TextField
                        label="Change name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    >
                    </TextField>
                </div>
                <div className={styles.field}>
                    <Button variant="contained" color="primary" onClick={handleSubmitName}>Submit</Button>
                </div>
            </div>


        </div >
    )
})

export default Profile