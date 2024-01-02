import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import BasketApi from "../../api/BasketApi"
import BasketStore from "../../store/BasketStore"
import AuthStore from "../../store/AuthStore"
import { useNavigate } from "react-router-dom"
import Product from "../../components/Product/Product"


const Basket = observer(() => {
    let navigate = useNavigate();
    useEffect(() => {
        if (AuthStore.token === "") {
            return navigate("/login")
        }
        const fetch = async () => {
            BasketApi.getProducts(1, 10)
        }
        fetch()
    }, [])

    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const handleSelectedProducts = (event: any) => {
        var updatedList = [...selectedProducts];
        if (event.target.checked) {
            updatedList = [...selectedProducts, event.target.value];
        } else {
            updatedList.splice(selectedProducts.indexOf(event.target.value), 1);
        }
        setSelectedProducts(updatedList);
    };

    const decreaseQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity > 0) {
            await BasketApi.changeProduct(id, newQuantity)
            BasketApi.getProducts(BasketStore.currentPage, BasketStore.pageSize);
        }
    }
    const increaseQuantity = async (id: number, quantity: number, newQuantity: number) => {
        if (newQuantity <= quantity) {
            await BasketApi.changeProduct(id, newQuantity)
            BasketApi.getProducts(BasketStore.currentPage, BasketStore.pageSize);
        }
    }

    const decreasePage = async () => {
        if (BasketStore.currentPage >= 1) {
            BasketApi.getProducts(BasketStore.currentPage - 1, BasketStore.pageSize)
        }
    }

    const increasePage = async () => {
        if (BasketStore.currentPage <= BasketStore.pages) {
            BasketApi.getProducts(BasketStore.currentPage + 1, BasketStore.pageSize)
        }
    }

    const handlerChangeCurrentPage = async (event: any) => {
        if (event.target.value >= 1 && event.target.value <= BasketStore.pages) {
            BasketApi.getProducts(event.target.value, BasketStore.pageSize)
        }
    }


    return (
        <div>
            <div>
                {BasketStore.products.map((product) => (
                    <div>
                        <Product product={product.product} />
                        <button onClick={() => decreaseQuantity(product.product.id, product.quantity - 1)}>-</button>
                        <div>{product.quantity}</div>
                        <button onClick={() => increaseQuantity(product.product.id, product.product.quantity, product.quantity + 1)}>+</button>
                        <input value={product.product.id} onChange={handleSelectedProducts} type="checkbox"></input>
                    </div>
                ))}
            </div>
            <div>
                <button>Buy</button>
            </div>
            <div>
                {BasketStore.currentPage === 1 ? (<button disabled>Previous</button>) : <button onClick={() => decreasePage()}>Previous</button>}
                <input type="text" value={BasketStore.currentPage} onChange={handlerChangeCurrentPage}></input>
                {BasketStore.currentPage === BasketStore.pages ? <button disabled>Next</button> : <button onClick={() => increasePage()}>Next</button>}
                <p>Pages 1 - {BasketStore.pages}</p>
            </div>
        </div>
    )
})

export default Basket