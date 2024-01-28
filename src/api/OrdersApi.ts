import apiUrl from "../config";
import AuthStore from "../store/AuthStore";
import OrdersStore from "../store/OrdersStore";
import UiStore from "../store/UiStore";

class OrdersApi {
    addProduct = async (productId: number, quantity: number) => {
        try {
            const response = fetch(apiUrl + 'order/addproduct?productid=' + productId + "&quantity=" + quantity, {
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
            const response = fetch(apiUrl + "order/getproducts?page=" + page + "&pageSize=" + pageSize, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthStore.token}`
                }
            })
            const data = await (await response).json()
            if (data.products !== undefined) {
                OrdersStore.setPagesQuantity(data.totalCount)
                OrdersStore.setPages(data.totalPages)
                OrdersStore.setCurrentPage(data.currentPage)
                OrdersStore.setPageSize(data.pageSize)
                OrdersStore.setProducts(data.products)
            }

            if (data.error !== undefined) {
                UiStore.AddErrorAlert(data.error)
            }
        }
        catch (error: any) {
            console.log(error)
        }
    }
    deleteProduct = async (productId: number) => {
        try {
            const response = fetch(apiUrl + "order/deleteproduct?productId=" + productId, {
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
        catch (error: any) {
            console.log(error)
        }
    }
    changeProduct = async (productId: number, quantity: number) => {
        try {
            const response = fetch(apiUrl + "order/changeproduct?productId=" + productId + "&quantity=" + quantity, {
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
        catch (error: any) {
            console.log(error)
        }
    }
}


export default new OrdersApi();