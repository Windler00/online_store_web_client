import { observer } from "mobx-react-lite"
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const Admin = observer(() => {
    useEffect(() => {
        const fetch = async () => {
            AuthStore.getUsers(0, 30)
        }
        if (AuthStore.role === "Admin" && AuthStore.token !== "" && AuthStore.users.length === 0) {
            fetch()
        }
    }, [])

    const HandleSelect = (Props:any) => {
        const [role, setRole] = useState(Props.currRole);


        const handleRoleChange = (event: any) => {
            AuthStore.changeRole(Props.id, event.target.value)
            setRole(event.target.value)
        }
        return (
            <div>
                <Select
                    value={role}
                    onChange={handleRoleChange}
                >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Seller">Seller</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
            </div>
        )
    }


    return (
        <div>
            {AuthStore.role !== "Admin" && AuthStore.token === "" ? (<Navigate to={"/"} replace={true} />)
                :
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {AuthStore.users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <HandleSelect id={user.id} currRole={user.role}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>}
        </div>
    )
})

export default Admin