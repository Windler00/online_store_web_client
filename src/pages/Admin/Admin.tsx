import { observer } from "mobx-react-lite"
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";


const Admin = observer(() => {
    
    return(
        <div>
            {AuthStore.role !== "Admin" && AuthStore.token === ""? (<Navigate to={"/"} replace={true}/>)
            :
            <>
                That admin page!
            </>}
        </div>
    )
})

export default Admin