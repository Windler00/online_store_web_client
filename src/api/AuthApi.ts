import apiUrl from "../config";
import AuthStore from "../store/AuthStore";
import jwt from 'jwt-decode';
import UiStore from "../store/UiStore";

class AuthApi {
    registration = async (email: string, repeatEmail: string, username: string, password: string, repeatPassword: string) => {
        try {
            const body = {
                email: email,
                emailConfirmation: repeatEmail,
                username: username,
                password: password,
                passwordConfirmation: repeatPassword
            }
            const response = fetch(apiUrl + 'auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const data = await (await response).json();

            if (data.token !== undefined) {
                AuthStore.setToken(data.token)
                AuthStore.setRole(data.role)
                AuthStore.setName(data.name)
                const jwtObj: any = jwt(data.token);
                AuthStore.setEmail(jwtObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"])
                UiStore.AddSuccessAlert("Login successful");
            }
            else {
                UiStore.AddErrorAlert(data.message);
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error);
        }
    }

    login = async (email: string, password: string) => {
        try {
            const body = {
                email: email,
                password: password
            }
            const response = fetch(apiUrl + 'auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const data = await (await response).json();

            if (data.token !== undefined) {
                AuthStore.setToken(data.token)
                AuthStore.setRole(data.role)
                AuthStore.setName(data.name)
                AuthStore.setAvatar(data.avatar)
                const jwtObj: any = jwt(data.token);
                AuthStore.setEmail(jwtObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"])
                UiStore.AddSuccessAlert("Login successful");
            }
            else {
                UiStore.AddErrorAlert(data.message);
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error);
        }
    }

    changeEmail = async (email: string) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${AuthStore.token}`);
            const body = {
                email: email
            }
            const response = fetch(apiUrl + 'auth/changeemail', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
                body: JSON.stringify(body)
            })
            const data = await (await response).json();

            if (data.message === "Email changed") {
                UiStore.AddSuccessAlert(data.message)
                AuthStore.email = email
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error.message)
        }
    }

    changeName = async (name: string) => {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${AuthStore.token}`);
            const body = {
                name: name
            }
            const response = fetch(apiUrl + 'auth/changename', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
                body: JSON.stringify(body)
            })
            const data = await (await response).json();

            if (data.message === "Username changed") {
                UiStore.AddSuccessAlert(data.message)
                AuthStore.name = name
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error.message)
        }
    }

    changePass = async (newPass: string, newPassRepeat: string) => {
        try {
            const body = {
                NewPass: newPass,
                NewPassRepeat: newPassRepeat
            }
            const response = fetch(apiUrl + 'auth/changepass', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
                body: JSON.stringify(body)
            })
            const data = await (await response).json();

            if (data.message === "Password changed") {
                UiStore.AddSuccessAlert(data.message)
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error.message)
        }
    }

    getUsers = async (page: number, pageSize: number) => {
        try {
            const response = fetch(apiUrl + "auth/getusers?page=" + page + "&pageSize=" + pageSize, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
            })
            const data = await (await response).json();
            AuthStore.setUsers(data.users)
        }
        catch (error: any) {
            UiStore.AddErrorAlert("Failed to fetch users:" + error)
        }
    }

    changeRole = async (id: number, role: string) => {
        try {
            const body = {
                id: id,
                role: role
            }
            const response = fetch(apiUrl + "auth/changerole", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
                body: JSON.stringify(body)
            })
            const data = await (await response).json();
            if (data.message === "Role changed") {
                UiStore.AddSuccessAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

    uploadAvatar = async (file: any) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = fetch(apiUrl + "auth/uploadavatar", {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
                body: formData
            })
            await response
            if ((await response).ok) {
                const data = await (await response).json();
                AuthStore.setAvatar(data.avatar)
                UiStore.AddSuccessAlert(data.message)
            }
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export default new AuthApi();