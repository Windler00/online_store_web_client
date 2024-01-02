import apiUrl from "../config";
import AuthStore from "../store/AuthStore";
import BasketStore from "../store/BasketStore";
import UiStore from "../store/UiStore";

class BasketApi {
    addProduct = async (productId: number, quantity: number) => {
        try {
            const response = fetch(apiUrl + 'basket/addproduct?productid=' + productId + "&quantity=" + quantity, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                },
            })
            const data = await (await response).json()
            if (data.success !== undefined) {
                UiStore.AddSuccessAlert(data.success)
            }
            if (data.error !== undefined) {
                UiStore.AddErrorAlert(data.error)
            }
        }
        catch (error: any) {
            console.log(error)
        }
    }
    getProducts = async (page: number, pageSize: number) => {
        try {
            const response = fetch(apiUrl + "basket/getproducts?page=" + page + "&pageSize=" + pageSize, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthStore.token}`
                }
            })
            const data = await (await response).json()
            if (data.products !== undefined) {
                BasketStore.setPagesQuantity(data.totalCount)
                BasketStore.setPages(data.totalPages)
                BasketStore.setCurrentPage(data.currentPage)
                BasketStore.setPageSize(data.pageSize)
                BasketStore.setProducts(data.products)
            }

            if (data.error !== undefined) {
                UiStore.AddErrorAlert(data.error)
            }
        }
        catch (error: any) {
            console.log(error)
        }
    }
    deleteProduct = async (productId: number) =>{
        try {
            const response = fetch(apiUrl + "basket/deleteproduct?productId=" + productId, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthStore.token}`
                }
            })
            const data = await (await response).json()
            if (data.success !== undefined) {
                UiStore.AddSuccessAlert(data.success)
            }
            if (data.error !== undefined) {
                UiStore.AddErrorAlert(data.error)
            }
        }
        catch(error:any){
            console.log(error)
        }
    }
    changeProduct = async (productId: number, quantity:number) =>{
        try {
            const response = fetch(apiUrl + "basket/changeproduct?productId=" + productId + "&quantity=" + quantity, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthStore.token}`
                }
            })
            const data = await (await response).json()
            if (data.success !== undefined) {
                UiStore.AddSuccessAlert(data.success)
            }
            if (data.error !== undefined) {
                UiStore.AddErrorAlert(data.error)
            }
        }
        catch(error:any){
            console.log(error)
        }
    }
}

export default new BasketApi();