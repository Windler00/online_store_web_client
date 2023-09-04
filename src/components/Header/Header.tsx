import Button from '@mui/material/Button/Button'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore'
import { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'

const Header = observer(() => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const HandleLogout = () => {
        AuthStore.token = "";
    }

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Link to='/'>
                    <Button variant="contained">OnlineStore</Button>
                </Link>
            </div>
            <div className={styles.right}>
                {AuthStore.token === "" ? (
                    <div>
                        <Link to='/login'>
                            <Button variant="contained">Login</Button>
                        </Link>
                        <Link to='/registration'>
                            <Button variant="contained">Registration</Button>
                        </Link>
                    </div>
                )
                    :
                    (
                        <div>
                            <Button variant="contained" aria-controls="dropdown-menu" aria-haspopup="true" onClick={handleClick}>{AuthStore.email}</Button>
                            <Menu
                                id="dropdown-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem><Link id={styles.Link} to="/profile">Profile</Link></MenuItem>
                                <MenuItem onClick={HandleLogout}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
            </div>
        </div>
    )
})

export default Header