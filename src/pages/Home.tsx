import { useEffect } from "react"
import ProductStore from "../store/ProductStore"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom";
import styles from './home.module.css'


const Home = observer(() => {
    const HandleProducts = observer(() => {
        let result: any[] = [];
        if (ProductStore.products !== undefined) {
            ProductStore.products?.map((product =>
                result.push(
                    <>
                        <Link key={product.id} to={"/product/" + product.id}>
                            <div key={product.id} className={styles.ProductCard}>
                                <img src={product.imageUrl} alt="Product image" />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                        </Link >
                    </>
                )
            ))
        }
        return (
            <>
                {result}
            </>
        )
    })


    useEffect(() => {
        const fetch = async () => {
            ProductStore.getProducts(0, 30)
        }
        fetch()


    }, [])

    return (
        <div className={styles.Products}>
            <HandleProducts />
        </div>
    )
})

export default Home