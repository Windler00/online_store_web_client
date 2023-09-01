import { observer } from "mobx-react-lite";
import styles from './profile.module.css'
import { Button, TextField } from "@mui/material";
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
    return (
        <div className={styles.profile}>
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
        </div >
    )
})

export default Profile