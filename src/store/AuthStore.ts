import { action, makeAutoObservable, observable } from "mobx";

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable token: string = "";
    @observable id: number | undefined;
    @observable email: string = "";
    @observable name: string = "";
    @observable role: string = "";
    @observable avatar: string = "";
    @observable users: any[] = [];

    @action
    setToken = async(token:string) => {
        this.token = token;
    }

    @action
    setId = async(id:number) => {
        this.id = id;
    }

    @action
    setEmail = async(email:string) => {
        this.email = email;
    }

    @action
    setName = async(name:string) => {
        this.name = name;
    }

    @action
    setRole = async(role:string) => {
        this.role = role;
    }

    @action
    setAvatar = async(avatar:string) => {
        this.avatar = avatar;
    }

    @action
    setUsers = async(users:any[]) => {
        this.users = users;
    }
}

export default new AuthStore();