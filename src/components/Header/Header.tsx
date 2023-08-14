import Button from '@mui/material/Button/Button'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Link to='/'>
                    <Button variant="contained">OnlineStore</Button>
                </Link>
            </div>
            <div className={styles.right}>
                <Link to='/login'>
                    <Button variant="contained">Login</Button>
                </Link>
                <Link to='/registration'>
                    <Button variant="contained">Registration</Button>
                </Link>
            </div>
        </div>
    )
}