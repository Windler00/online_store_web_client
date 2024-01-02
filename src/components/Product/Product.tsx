import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number
    imageUrl: string;
}

interface Props{
    product:Product
}


const Product = (product: Props) => {
    return (
        <div key={product.product.id}>
            <Link key={product.product.id} to={"/product/" + product.product.id}>
                <div>
                    <img src={product.product.imageUrl} alt="Product image" />
                    <h3>{product.product.name}</h3>
                    <p>{product.product.description.length >= 40? (product.product.description.substring(0, 40) + "...") : (product.product.description)}</p>
                    <p>{product.product.price} $</p>
                </div>
            </Link>
        </div>
    )
}

export default Product;