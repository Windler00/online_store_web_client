import apiUrl from "../config"
import ProductStore from "../store/ProductStore"
import UiStore from "../store/UiStore"


class SearchApi {
    searchProducts = async (searchText: string, page: number, pageSize: number) => {
        try {
            const response = fetch(apiUrl + 'search/searchproducts?searchtext=' + searchText + '&page=' + page + '&pageSize=' + pageSize, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await (await response).json()
            if (data.error !== undefined) {
                UiStore.AddErrorAlert(data.error)
            }
            if (data.totalCount > 0) {
                ProductStore.setPagesQuantity(data.totalCount)
                ProductStore.setPages(data.totalPages)
                ProductStore.setCurrentPage(data.currentPage)
                ProductStore.setPageSize(data.pageSize)
                ProductStore.setProducts(data.products)
            }
        }
        catch (error: any) {
            UiStore.AddErrorAlert(error)
        }
    }
}

export default new SearchApi();