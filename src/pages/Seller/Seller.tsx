import { observer } from "mobx-react-lite";
import styles from "./seller.module.css"
import { Button, Card, CardMedia, Dialog, TextField, Typography, Zoom } from "@mui/material";
import { useState } from "react";
import ProductStore from "../../store/ProductStore";


const Seller = observer(() => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event: any) => {
        setProductDescription(event.target.value);
    };

    const handleSubmit = () => {
        ProductStore.createProduct(productName, productDescription)
    }

    return (
        <div className={styles.Seller}>
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
                <div className={styles.Field}>
                    <Typography variant="h5" component="div">
                        <TextField
                            label="Product name"
                            value={productName}
                            onChange={handleProductNameChange}
                            required
                        />
                    </Typography>
                </div>
                <div className={styles.Field}>
                    <Typography variant="body2" color="text.secondary">
                        <TextField
                            label="Product description"
                            value={productDescription}
                            onChange={handleProductDescriptionChange}
                            required
                        />
                    </Typography>
                </div>
                <div className={styles.Field}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default Seller