import { observer } from "mobx-react-lite"
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../api/AuthApi";


const Admin = observer(() => {
    useEffect(() => {
        const fetch = async () => {
            Auth.getUsers(1, 10)
        }
        if (AuthStore.role === "Admin" && AuthStore.token !== "" && AuthStore.users.length === 0) {
            fetch()
        }
    }, [])

    const HandleSelect = (Props:{currRole:string, id:number}) => {
        const [role, setRole] = useState(Props.currRole);


        const handleRoleChange = (event: any) => {
            Auth.changeRole(Props.id, event.target.value)
            setRole(event.target.value)
        }
        return (
            <div>
                <select value={role} onChange={handleRoleChange}>
                    <option value="User">User</option>
                    <option value="Seller">Seller</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
        )
    }


    return (
        <div>
            {AuthStore.role !== "Admin" && AuthStore.token === "" ? (<Navigate to={"/"} replace={true} />)
                :
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AuthStore.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><HandleSelect id={user.id} currRole={user.role}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
        </div>
    )
})

export default Admin