import Button from '@mui/material/Button/Button'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore'

const Header = observer(() => {
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
                ) :
                    (
                        <div>
                            <Link to='/profile'>
                                <Button variant="contained">{AuthStore.email}</Button>
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    )
})

export default Header