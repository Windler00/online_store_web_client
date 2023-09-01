import { observer } from "mobx-react-lite"
import UiStore from "../../store/UiStore"
import styles from './alertbox.module.css'


const AlertBox = observer(() => {
    return (
        <div className={styles.alertbox}>
            {UiStore.AlertStore}
        </div>
    )
})

export default AlertBox