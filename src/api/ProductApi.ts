import apiUrl from "../config"
import AuthStore from "../store/AuthStore"
import ProductStore from "../store/ProductStore"
import UiStore from "../store/UiStore"

class ProductApi {
    getProducts = async (page: number, pageSize: number) => {
        try {
            const response = fetch(apiUrl + 'product/getproducts?page=' + page + '&pageSize=' + pageSize, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await (await response).json()
            ProductStore.setPagesQuantity(data.totalCount)
            ProductStore.setPages(data.totalPages)
            ProductStore.setCurrentPage(data.currentPage)
            ProductStore.setPageSize(data.pageSize)
            ProductStore.setProducts(data.products)
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }
    getProduct = async (id: string) => {
        try {
            const response = fetch(apiUrl + 'product/getproduct?id=' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await (await response).json()

            ProductStore.setId(data.id)
            ProductStore.setName(data.name)
            ProductStore.setDescription(data.description)
            ProductStore.setPrice(data.price)
            ProductStore.setQuantity(data.quantity)
            ProductStore.setImageUrl(data.imageUrl)
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

    createProduct = async (name: string, description: string, price: number, quantity: number) => {
        try {
            const body = {
                name: name,
                description: description,
                price: price,
                quantity: quantity
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
                ProductStore.setId(data.product.id)
                ProductStore.setName(data.product.name)
                ProductStore.setDescription(data.product.description)
                ProductStore.setPrice(data.product.price)
            }
            else {
                UiStore.AddErrorAlert(data.message)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }

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

    changeProduct = async (id: number, name: string, description: string, price: number, quantity: number) => {
        try {
            const body = {
                id: id,
                name: name,
                description: description,
                price: price,
                quantity: quantity
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

    deleteProduct = async () => {
        try {
            const body = {
                name: ProductStore.name,
                description: ProductStore.description
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

export default new ProductApi();