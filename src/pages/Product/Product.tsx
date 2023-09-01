import { observer } from "mobx-react-lite";
import styles from "./product.module.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import { Paper, Typography } from "@mui/material";


const Product = observer(() => {
    let { ProductId } = useParams();

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
                <img src="https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png" />
            </div>
            <div className={styles.ProductInfo}>
                <Typography variant="h5" component="div">
                    {ProductStore.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ProductStore.description}
                </Typography>
            </div>
        </div>
    )
})

export default Product