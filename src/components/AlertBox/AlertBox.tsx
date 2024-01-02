import { observer } from "mobx-react-lite"
import UiStore from "../../store/UiStore"


const AlertBox = observer(() => {
    return (
        <div>
            {UiStore.AlertStore}
        </div>
    )
})

export default AlertBox