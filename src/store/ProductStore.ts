import { action, makeAutoObservable, observable } from "mobx";
import apiUrl from "../config";
import UiStore from "./UiStore";
import AuthStore from "./AuthStore";


type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity:number
    imageUrl: string;
}

class ProductStore {
    @observable products: Product[] = [];
    @observable id?: number
    @observable name?: string;
    @observable description?: string;
    @observable price?: number;
    @observable quantity?: number
    @observable imageUrl: string = "";
    @observable pagesQuantity: number = 0;
    @observable pages: number = 0;
    @observable currentPage: number = 1;
    @observable pageSize: number = 10;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    getProducts = async (page: number, pageSize: number) => {
        try {
            const response = fetch(apiUrl + 'product/getproducts?page='+ page + '&pageSize=' + pageSize, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await (await response).json()
            this.pagesQuantity = data.totalCount
            this.pages = data.totalPages
            this.currentPage = data.currentPage
            this.pageSize = data.pageSize
            this.products = data.products
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
            this.price = data.price;
            this.quantity = data.quantity;
            this.imageUrl = data.imageUrl;
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

    @action
    createProduct = async (name: string, description: string, price: number, quantity:number) => {
        try {
            const body = {
                name: name,
                description: description,
                price: price,
                quantity:quantity
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
            if (data.message === "Product added") {
                UiStore.AddSuccessAlert(data.message)
                this.id = data.product.id
                this.name = data.product.name
                this.description = data.product.description
                this.price = data.product.price
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

    @action
    uploadImage = async (file: any, id: any) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = fetch(apiUrl + "product/uploadimage?id=" + id, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${AuthStore.token}`
                }),
                body: formData
            })
            await response
            if ((await response).ok) {
                const data = await (await response).json();
                UiStore.AddSuccessAlert(data.message)
            }
        }
        catch (error: any) {
            console.log(error);
        }
    }

    @action
    changeProduct = async (id: number, name: string, description: string, price: number,quantity:number) => {
        try {
            const body = {
                id: id,
                name: name,
                description: description,
                price: price,
                quantity:quantity
            }

            const response = fetch(apiUrl + 'product/changeproduct', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                },
                body: JSON.stringify(body)
            })
            const data = await (await response).json()
            if (data.message === "Product changed") {
                UiStore.AddSuccessAlert(data.message)
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

    @action
    deleteProduct = async () => {
        try {
            const body = {
                name: this.name,
                description: this.description
            }
            const response = fetch(apiUrl + 'product/deleteproduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                },
                body: JSON.stringify(body)
            })
            const data = await (await response).json()
            if (data.message === "Product deleted") {
                UiStore.AddSuccessAlert(data.message)
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }
}

export default new ProductStore();