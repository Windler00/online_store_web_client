import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import BasketApi from "../../api/BasketApi"
import BasketStore from "../../store/BasketStore"
import AuthStore from "../../store/AuthStore"
import { useNavigate } from "react-router-dom"
import Product from "../../components/Product/Product"
import styles from './basket.module.css'
import OrdersApi from "../../api/OrdersApi"

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

    const handlerChangeCurrentPage = async (value: any) => {
        if (value >= 1 && value <= BasketStore.pages) {
            BasketApi.getProducts(value, BasketStore.pageSize)
        }
    }

    const handleBuyProducts = async () => {
        BasketStore.products.map( async (product:any) => {
            await OrdersApi.addProduct(product.product.id, product.quantity);
            await BasketApi.deleteProduct((product.product.id))
            await BasketApi.getProducts(1, 10);
        })
    }


    return (
        <div>
            <div className={styles.BasketItems}>
                {BasketStore.products.map((product, index) => (
                    <div className={styles.BasketItem}>
                        <Product key={index} product={product.product} />
                        <div className={styles.BasketItemQuantity}>
                            <div>
                                <button className="btn btn-dark m-1" onClick={() => decreaseQuantity(product.product.id, product.quantity - 1)}>-</button>
                            </div>
                            <div className="m-1">{product.quantity}</div>
                            <div>
                                <button className="btn btn-dark m-1" onClick={() => increaseQuantity(product.product.id, product.product.quantity, product.quantity + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {BasketStore.products.length > 0 ? (<button className="btn btn-dark m-3" onClick={() => handleBuyProducts()}>Buy</button>): null}
            </div>
            <div className={styles.PagesNav}>
                {BasketStore.currentPage === 1 ? (<button className="btn btn-dark" disabled>Previous</button>) : <button className="btn btn-dark" onClick={() => decreasePage()}>Previous</button>}
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            Array.from({ length: BasketStore.pages }, (_, index) => (
                                BasketStore.currentPage === index + 1 ?
                                    (<li className="page-item" key={index}><button disabled className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                    : index + 1 === 1 ?
                                        (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                        : index + 1 === BasketStore.pages ?
                                            (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                            : BasketStore.currentPage === index ?
                                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                : BasketStore.currentPage === index + 1 ?
                                                    (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                    : BasketStore.currentPage === index + 2 ?
                                                        (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                        :
                                                        (null)
                            ))
                        }
                    </ul>
                </nav>
                {BasketStore.currentPage === BasketStore.pages ? <button className="btn btn-dark" disabled>Next</button> : <button className="btn btn-dark" onClick={() => increasePage()}>Next</button>}
            </div>
        </div >
    )
})

export default Basket