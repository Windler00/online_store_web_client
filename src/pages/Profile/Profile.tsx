import { observer } from "mobx-react-lite";
import styles from './profile.module.css'
import { useEffect, useState } from "react";
import AuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image/Image"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const Profile = observer(() => {
    let navigate = useNavigate();
    useEffect(() => {
        if (AuthStore.token === "") {
            return navigate("/login")
        }
    })

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    function handleSubmitAvatar() {
        AuthStore.uploadAvatar(selectedFile)
    }

    const HandleEmail = observer(() => {
        const [email, setEmail] = useState('');

        const handleEmailChange = (event: any) => {
            setEmail(event.target.value);
        };
        const handleSubmitEmail = (event: any) => {
            event.preventDefault();
            AuthStore.changeEmail(email)
        };
        return (
            <div className={styles.Form}>
                <form>
                    <label>{AuthStore.email}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange} />
                </form>
                <button className={styles.SubmitButton} type="submit" onClick={handleSubmitEmail}>Submit</button>
            </div>
        )
    })

    const HandleName = observer(() => {
        const [name, setName] = useState('');

        const handleNameChange = (event: any) => {
            setName(event.target.value);
        };
        const handleSubmitName = (event: any) => {
            event.preventDefault();
            AuthStore.changeName(name)
        };
        return (
            <div className={styles.Form}>
                <form>
                    <label>{AuthStore.name}</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange} />
                </form>
                <button className={styles.SubmitButton} type="submit" onClick={handleSubmitName}>Submit</button>
            </div>
        )
    })

    const HandlePassword = observer(() => {
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

        const [showPassword, setShowPassword] = useState(false);
        const [showRepeatPassword, setShowRepeatPassword] = useState(false);
        const handleTogglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
        const handleToggleRepeatPasswordVisibility = () => {
            setShowRepeatPassword(!showRepeatPassword);
        };

        return (
            <div className={styles.Form}>
                <form>
                    <label>Change password</label>
                    <div className={styles.InputWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={newPass}
                            onChange={handleNewPassChange}
                        />
                        <button type="button" className={styles.showPasswordButton} onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button>
                    </div>
                    <div className={styles.InputWrapper}>
                        <input
                            type={showRepeatPassword ? 'text' : 'password'}
                            id="repeatPassword"
                            value={newPassRepeat}
                            onChange={handleNewPassRepeatChange}
                        />
                        <button type="button" className={styles.showPasswordButton} onClick={handleToggleRepeatPasswordVisibility}>
                            {showRepeatPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button></div>

                </form>
                <button className={styles.SubmitButton} type="submit" onClick={handleSubmitNewPass}>Submit</button>
            </div>
        )
    })

    return (
        <div className={styles.profile}>
            <div className={styles.ProfileInfo}>
                <div className={styles.avatar}>
                    {AuthStore.avatar === "" ?
                        (
                            <>
                                <Image src={process.env.PUBLIC_URL + "defaultAvatar.png"} alt="avatar" />
                            </>
                        )
                        :
                        (
                            <>
                                <Image src={AuthStore.avatar} alt="avatar" />
                            </>
                        )}
                </div>
                <div className={styles.InputFileWrapper}>
                    <form>
                        <input className={styles.FileInput} type="file" onChange={handleFileChange} />
                        <button className={styles.FileInputButton} onClick={handleSubmitAvatar}>Submit</button>
                    </form>
                </div>
            </div>

            <div className={styles.ProfileChange}>
                <HandleEmail />
                <HandleName />
                <HandlePassword />
            </div>
        </div >
    )
})

export default Profile