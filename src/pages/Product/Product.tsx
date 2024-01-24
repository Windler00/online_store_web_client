import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import Image from "../../components/Image/Image"
import ProductApi from "../../api/ProductApi"
import AuthStore from "../../store/AuthStore";
import BasketApi from "../../api/BasketApi";
import styles from "./product.module.css";


const Product = observer(() => {
    let { ProductId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if (ProductId !== undefined) {
                ProductApi.getProduct(ProductId)
            }
        }
        fetch()
    }, [])

    const BuyHandler = () => {
        if (AuthStore.token === "") {
            return navigate("/registration")
        }
        if (ProductStore.id !== undefined) {
            BasketApi.addProduct(ProductStore.id, quantity)
        }
    }

    const [quantity, setQuantity] = useState(1);
    function changeQuantity(event: any) {
        if (ProductStore.quantity !== undefined && event.target.value <= ProductStore.quantity && event.target.value >= 1) {
            setQuantity(event.target.value);
        }
    }

    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const displayText = collapsed ? ProductStore.description.slice(0, 200) : ProductStore.description;


    return (
        <div className={styles.Product}>
            <div>
                <Image src={ProductStore.imageUrl} alt="Product image"></Image>
            </div>
            <div className={styles.ProductInfo}>
                <h3>{ProductStore.name}</h3>

                <p>Description: {displayText} {ProductStore.description.length > 200 && collapsed && (
                        <button style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }} onClick={toggleCollapse}>
                            {'...'}
                        </button>
                )}</p>

                <p>Quantity: {ProductStore.quantity}</p>
                <p>Price: {ProductStore.price} $</p>
                <div>
                    <input className="form-control mb-3" type="number" value={quantity} onChange={changeQuantity} />
                </div>
                <div>
                    <button className="btn btn-dark" onClick={BuyHandler}>Add to basket</button>
                </div>
            </div>
        </div>
    )
})

export default Product