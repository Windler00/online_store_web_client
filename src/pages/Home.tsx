import { useEffect } from "react"
import ProductStore from "../store/ProductStore"
import { observer } from "mobx-react-lite"
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from './home.module.css'

const Home = observer(() => {
    const HandleProducts = observer(() => {
        let result: any[] = [];
        if (ProductStore.products !== undefined) {
            ProductStore.products?.map((product =>
                result.push(
                    <div key={product.id} className={styles.ProductCard}>
                        <Link to={"/product/" + product.id} style={{ textDecoration: "none" }} >
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png"
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                )
            ))
        }
        return (
            <div>
                {result}
            </div>
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