import { observer } from "mobx-react-lite";
import styles from "./product.module.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import Image from "../../components/Image/Image"


const Product = observer(() => {
    let { ProductId } = useParams();

    const image = "https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png"

    useEffect(() => {
        const fetch = async () => {
            if (ProductId !== undefined) {
                ProductStore.getProduct(ProductId)
            }
        }
        fetch()
    }, [])
    return (
        <div className={styles.Product}>
            <div className={styles.Img}>
                <Image src={image} alt="Product image"></Image>
            </div>
            <div className={styles.ProductInfo}>
                <h3>{ProductStore.name}</h3>
                <p>{ProductStore.description}</p>
                <button>Buy</button>
            </div>
        </div>
    )
})

export default Product