import { useEffect } from "react"
import ProductStore from "../store/ProductStore"
import { observer } from "mobx-react-lite"
import ProductApi from "../api/ProductApi";
import Product from "../components/Product/Product";
import styles from "./home.module.css"
import { Link } from "react-router-dom";


const Home = observer(() => {

    const decreasePage = async () => {
        if (ProductStore.currentPage >= 1) {
            ProductApi.getProducts(ProductStore.currentPage - 1, ProductStore.pageSize)
        }
    }

    const increasePage = async () => {
        if (ProductStore.currentPage <= ProductStore.pages) {
            ProductApi.getProducts(ProductStore.currentPage + 1, ProductStore.pageSize)
        }
    }

    const handlerChangeCurrentPage = async (value: any) => {
        if (value >= 1 && value <= ProductStore.pages) {
            ProductApi.getProducts(value, ProductStore.pageSize)
        }
    }


    useEffect(() => {
        const fetch = async () => {
            ProductApi.getProducts(1, 40)
        }
        fetch()
    }, [])

    return (
        <div>
            <div className={styles.Products}>
                {ProductStore.products.map((product, index) => <><Link className="btn" to={"/product/" + product.id} key={index}><Product key={index} product={product}/></Link></>)}
            </div>
            <div className={styles.PagesNav}>
                {ProductStore.currentPage === 1 ? (<button className="btn btn-dark" disabled>Previous</button>) : <button className="btn btn-dark" onClick={() => decreasePage()}>Previous</button>}
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            Array.from({ length: ProductStore.pages }, (_, index) => (
                                ProductStore.currentPage === index +1 ?
                                (<li className="page-item" key={index}><button disabled className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index +1)}>{index +1}</button></li>)
                                : index +1 === 1 ?
                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index +1)}>{index +1}</button></li>)
                                : index +1 === ProductStore.pages ?
                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index +1)}>{index +1}</button></li>)
                                : ProductStore.currentPage === index ? 
                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index +1)}>{index +1}</button></li>)
                                : ProductStore.currentPage === index + 1 ?
                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index +1)}>{index +1}</button></li>)
                                : ProductStore.currentPage === index + 2 ?
                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index +1)}>{index +1}</button></li>)
                                :
                                (null)
                              ))
                        }
                    </ul>
                </nav>
                {ProductStore.currentPage >= ProductStore.pages ? <button className="btn btn-dark" disabled>Next</button> : <button className="btn btn-dark" onClick={() => increasePage()}>Next</button>}
            </div>
        </div>
    )
})

export default Home