import { useEffect } from "react"
import ProductStore from "../store/ProductStore"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom";
import styles from './home.module.css'
import ProductApi from "../api/ProductApi";


const Home = observer(() => {

    const HandleProducts = observer(() => {

        let result: any[] = [];
        if (ProductStore.products !== undefined) {
            ProductStore.products?.map((product =>
                result.push(
                    <div className={styles.Product} key={product.id}>
                        <Link to={"/product/" + product.id}>
                            <div className={styles.ProductCard}>
                                <img src={product.imageUrl} alt="Product image" />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>{product.price} $</p>
                            </div>
                        </Link >
                    </div>
                )
            ))
        }
        return (
            <>
                {result}
            </>
        )
    })

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

    const handlerChangeCurrentPage = async (event:any) => {
        if(event.target.value >= 1 && event.target.value <= ProductStore.pages){
            ProductApi.getProducts(event.target.value, ProductStore.pageSize)
        }
     }


    useEffect(() => {
        const fetch = async () => {
            ProductApi.getProducts(1, 10)
        }
        fetch()


    }, [])

    return (
        <div>
            <div className={styles.Products}>
                <HandleProducts />
            </div>
            <div className={styles.PagesNav}>
                {ProductStore.currentPage === 1 ? (<button disabled>Previous</button>) : <button onClick={() => decreasePage()}>Previous</button>}
                <input type="text" value={ProductStore.currentPage} onChange={handlerChangeCurrentPage}></input>
                {ProductStore.currentPage === ProductStore.pages ? <button disabled>Next</button> : <button onClick={() => increasePage()}>Next</button>}
                <p>Pages 1 - {ProductStore.pages}</p>
            </div>
        </div>
    )
})

export default Home