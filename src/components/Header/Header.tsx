import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore'
import { useState } from 'react'

const Header = observer(() => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const handleClick = () => {
        setDropdownIsOpen(!dropdownIsOpen);
    };

    const HandleLogout = () => {
        AuthStore.token = "";
    }


    return (
        <div className={styles.Header}>
            <div className={styles.left}>
                <Link to='/'>OnlineStore</Link>
            </div>
            <div className={styles.right}>
                {AuthStore.token === "" ? (
                    <div>
                        <Link id={styles.Login} to='/login'>Login</Link>
                        <Link id={styles.Registration} to='/registration'>Registration</Link>
                    </div>
                )
                    :
                    (
                        <div className={styles.right}>
                            <button onClick={handleClick}>{AuthStore.email}</button>
                            {dropdownIsOpen && (<ul className={styles.DropdownMenu}>
                                <li><Link to="/profile">Profile</Link></li>
                                {AuthStore.role === "Admin" ? (
                                    <>
                                        <li><Link to="/admin">Admin panel</Link></li>
                                        <li><Link to="/seller">Seller panel</Link></li>
                                    </>
                                ):
                                (<>
                                    <li><Link to="/seller">Seller panel</Link></li>
                                </>)}
                                <li><button onClick={HandleLogout}>Log Out</button></li>
                            </ul>)}
                        </div>
                    )}
            </div>
        </div>
    )
})

export default Header