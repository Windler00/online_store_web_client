import { action, makeAutoObservable, observable } from "mobx";

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
    setProducts(products: Product[]){
        this.products = products;
    }

    @action
    setId(id: number) {
        this.id = id;
    }

    @action
    setName(name: string) {
        this.name = name;
    }

    @action
    setDescription(description: string) {
        this.description = description;
    }

    @action
    setPrice(price: number) {
        this.price = price;
    }

    @action
    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    @action
    setImageUrl(url: string) {
        this.imageUrl = url;
    }

    @action
    setPagesQuantity(quantity: number) {
        this.pagesQuantity = quantity;
    }

    @action
    setPages(pages: number) {
        this.pages = pages;
    }

    @action
    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    @action
    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }
}

export default new ProductStore();