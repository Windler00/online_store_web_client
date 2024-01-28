import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../../store/AuthStore";
import OrdersApi from "../../api/OrdersApi";
import OrdersStore from "../../store/OrdersStore";
import styles from './orders.module.css'
import Product from "../../components/Product/Product";


const Orders = observer(() => {
    let navigate = useNavigate();
    useEffect(() => {
        if (AuthStore.token === "") {
            return navigate("/login")
        }
        const fetch = async () => {
            OrdersApi.getProducts(1, 10)
        }
        fetch()
    }, [])

    const decreasePage = async () => {
        if (OrdersStore.currentPage >= 1) {
            OrdersApi.getProducts(OrdersStore.currentPage - 1, OrdersStore.pageSize)
        }
    }

    const increasePage = async () => {
        if (OrdersStore.currentPage <= OrdersStore.pages) {
            OrdersApi.getProducts(OrdersStore.currentPage + 1, OrdersStore.pageSize)
        }
    }

    const handlerChangeCurrentPage = async (value: any) => {
        if (value >= 1 && value <= OrdersStore.pages) {
            OrdersApi.getProducts(value, OrdersStore.pageSize)
        }
    }


    return (
        <div>
            <div className={styles.OrderItems}>
                {OrdersStore.products.map((product, index) => (
                    <div className={styles.OrderItem}>
                        <Link to={"/product/" + product.product.id}><Product key={index} product={product.product} /></Link>
                        <div>Quantity: {product.quantity}</div>
                    </div>
                ))}
            </div>
            <div className={styles.PagesNav}>
                {OrdersStore.currentPage === 1 ? (<button className="btn btn-dark" disabled>Previous</button>) : <button className="btn btn-dark" onClick={() => decreasePage()}>Previous</button>}
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            Array.from({ length: OrdersStore.pages }, (_, index) => (
                                OrdersStore.currentPage === index + 1 ?
                                    (<li className="page-item" key={index}><button disabled className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                    : index + 1 === 1 ?
                                        (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                        : index + 1 === OrdersStore.pages ?
                                            (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                            : OrdersStore.currentPage === index ?
                                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                : OrdersStore.currentPage === index + 1 ?
                                                    (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                    : OrdersStore.currentPage === index + 2 ?
                                                        (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                        :
                                                        (null)
                            ))
                        }
                    </ul>
                </nav>
                {OrdersStore.currentPage === OrdersStore.pages ? <button className="btn btn-dark" disabled>Next</button> : <button className="btn btn-dark" onClick={() => increasePage()}>Next</button>}
            </div>
        </div>
    )
})

export default Orders;