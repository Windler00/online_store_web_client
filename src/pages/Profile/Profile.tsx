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

    const [newPass, setNewPass] = useState('');

    const handleNewPassChange = (event: any) => {
        setNewPass(event.target.value);
    };

    const [newPassRepeat, setNewPassRepeat] = useState('');

    const handleNewPassRepeatChange = (event: any) => {
        setNewPassRepeat(event.target.value);
    };
    const handleSubmitNewPass = (event: any) => {
        event.preventDefault();
        AuthStore.changePass(newPass, newPassRepeat)
    };
    return (
        <div className={styles.profile}>
            <div className={styles.ProfileInfo}>
                <div className={styles.field}>
                    <Typography variant="h6" component="div">
                        {AuthStore.email}
                    </Typography>
                </div>
                <div className={styles.field}>
                    <Typography variant="h6" component="div">
                        {AuthStore.name}
                    </Typography>
                </div>
            </div>

            <div className={styles.ProfileChange}>
                <form onSubmit={handleSubmitEmail}>
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
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>

                <form onSubmit={handleSubmitName}>
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
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>

                <form onSubmit={handleSubmitNewPass}>
                    <div className={styles.field}>
                        <TextField
                            label="New password"
                            type="password"
                            value={newPass}
                            onChange={handleNewPassChange}
                            required
                        >
                        </TextField>
                    </div>
                    <div className={styles.field}>
                        <TextField
                            label="Repeat new password"
                            type="password"
                            value={newPassRepeat}
                            onChange={handleNewPassRepeatChange}
                            required
                        >
                        </TextField>
                    </div>
                    <div className={styles.field}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>

            </div>


        </div >
    )
})

export default Profile