import AlertBox from '../AlertBox/AlertBox'
import Header from '../Header/Header'
import styles from './layout.module.css'


export default function Layout(props: any) {
    return (
        <div className={styles.layout}>
            <Header></Header>
            <AlertBox></AlertBox>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}