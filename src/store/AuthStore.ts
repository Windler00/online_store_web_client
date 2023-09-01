import { action, makeAutoObservable, observable } from "mobx";
import apiUrl from '../config';
import jwt from 'jwt-decode';
import UiStore from "./UiStore";

class AuthStore {
    constructor(){
        makeAutoObservable(this);
    }
    
    @observable token: string = "";
    @observable id: number | undefined;
    @observable email: string = "";
    @observable name: string = "";
    @observable role: string = "";

    @action
    registration = async (email:string, repeatEmail:string, password:string, repeatPassword:string) => {
        const body = {
            email: email,
            emailConfirmation: repeatEmail,
            password: password,
            passwordConfirmation: repeatPassword
        }
        fetch(apiUrl + 'auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token !== undefined) {
                this.token = data.token;
                const jwtObj: any = jwt(this.token);
                this.role = jwtObj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                this.name = jwtObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                UiStore.AddSuccessAlert("Registration successful")
            }
            else{
                UiStore.AddErrorAlert(data.message)
            }
        })
        .catch(error => UiStore.AddErrorAlert(error));
    }

    @action
    login = async (email:string, password:string) => {
        const body = {
            email: email,
            password: password
        }
        fetch(apiUrl + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token !== undefined) {
                this.token = data.token
                const jwtObj: any = jwt(this.token);
                this.email = jwtObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
                this.role = jwtObj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                this.name = jwtObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                UiStore.AddSuccessAlert("Login successful")
            }
            else{
                UiStore.AddErrorAlert(data.message)
            }
        })
        .catch(error => UiStore.AddErrorAlert(error))
    }

    @action 
    changeEmail = async(email:string) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        const body = {
            email: email
        }
        fetch(apiUrl + 'auth/changeemail', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }),
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            UiStore.AddSuccessAlert(data.message)
        })
        .catch(error => UiStore.AddErrorAlert(error.message))
    }
    @action
    changeName = async (name: string) => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        const body = {
            name: name
        }
        fetch(apiUrl + 'auth/changename', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }),
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            UiStore.AddSuccessAlert(data.message)
        })
        .catch(error => UiStore.AddErrorAlert(error.message))
    }
}

export default new AuthStore();