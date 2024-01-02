import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import Image from "../../components/Image/Image"
import ProductApi from "../../api/ProductApi"
import AuthStore from "../../store/AuthStore";
import BasketApi from "../../api/BasketApi";


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
        if(AuthStore.token === ""){
            return navigate("/registration")
        }
        if(ProductStore.id !== undefined){
            BasketApi.addProduct(ProductStore.id, quantity)
        }
    }

    const [quantity, setQuantity] = useState(1);
    function changeQuantity(event:any){
        if(ProductStore.quantity !== undefined && event.target.value <= ProductStore.quantity && event.target.value >= 1){
            setQuantity(event.target.value);
        }
    }

    return (
        <div>
            <div>
                <Image src={ProductStore.imageUrl} alt="Product image"></Image>
            </div>
            <div>
                <h3>{ProductStore.name}</h3>

                <p>Description: {ProductStore.description}</p>
                <p>Quantity: {ProductStore.quantity}</p>
                <p>Price: {ProductStore.price} $</p>
                <input type="number" value={quantity} onChange={changeQuantity}/>
                <button onClick={BuyHandler}>Add to basket</button>
            </div>
        </div>
    )
})

export default Product