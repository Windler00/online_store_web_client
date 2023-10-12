import { observer } from "mobx-react-lite";
import styles from "./seller.module.css"
import { useState } from "react";
import ProductStore from "../../store/ProductStore";
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";
import Image from "../../components/Image/Image"


const Seller = observer(() => {


    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event: any) => {
        setProductDescription(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        ProductStore.createProduct(productName, productDescription)
    }

    return (
        <div className={styles.Seller}>
            {AuthStore.role !== "Seller" && AuthStore.token === "" ? (<Navigate to={"/"} replace={true} />) : (<></>)}
            <div className={styles.Img}>
                <Image src="https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png" alt="Product image" />
            </div>
            <div className={styles.ProductInfo}>
                <div className={styles.Form}>
                    <form>
                        <label>Product name</label>
                        <input
                            type="text"
                            id="ProductName"
                            value={productName}
                            onChange={handleProductNameChange}
                        />
                        <label>Product description</label>
                        <input
                            type="text"
                            id="ProductDescription"
                            value={productDescription}
                            onChange={handleProductDescriptionChange}
                        />
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default Seller