import { action, makeAutoObservable, observable } from "mobx";
import apiUrl from "../config";
import UiStore from "./UiStore";
import AuthStore from "./AuthStore";
import { Message } from "@mui/icons-material";


type Product = {
    id: number;
    name: string;
    description: string;
}

class ProductStore {
    @observable products: Product[] = [];
    @observable id?: number
    @observable name?: string;
    @observable description?: string;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    getProducts = async (first: number, last: number) => {
        try {
            const body = {
                first: first,
                last: last,
            }

            const response = fetch(apiUrl + 'product/getproducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await (await response).json()

            this.products = []
            data.map((product: any) => {
                let newProduct: Product = {
                    id: product.id,
                    name: product.name,
                    description: product.description
                };
                this.products.push(newProduct);
            })
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }
    @action
    getProduct = async (id: string) => {
        try {
            const body = {
                id: id
            }

            const response = fetch(apiUrl + 'product/getproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await (await response).json()

            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

    @action
    createProduct = async (name:string, description:string) => {
        try{
            const body = {
                name:name,
                description:description
            }

            const response = fetch(apiUrl + 'product/createproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                },
                body: JSON.stringify(body)
            })
            const data = await (await response).json()
            if (data.message === "Product added"){
                UiStore.AddSuccessAlert(data.message)
            }
            else{
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }
}

export default new ProductStore();