import { observer } from "mobx-react-lite";
import styles from "./product.module.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import { Button, Card, CardMedia, Dialog, Typography, Zoom } from "@mui/material";


const Product = observer(() => {
    let { ProductId } = useParams();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <Card>
                    <CardMedia
                        component="img"
                        image="https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png"
                        onClick={handleOpen}
                        alt="Product Image"
                    />
                    <Dialog open={open} onClose={handleClose}>
                        <Zoom in={open}>
                            <img src="https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png" alt="Zoomed Product Image" />
                        </Zoom>
                    </Dialog>
                </Card>
            </div>
            <div className={styles.ProductInfo}>
                <Typography variant="h5" component="div">
                    {ProductStore.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ProductStore.description}
                </Typography>
                <Button variant="contained">
                    Buy
                </Button>
            </div>
        </div>
    )
})

export default Product