import styles from "./product.module.css"

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number
    imageUrl: string;
}

interface Props {
    product: Product
}


const Product = (product: Props) => {
    return (
        <div className={styles.Product} key={product.product.id}>
            <div className={styles.ProductCard}>
                <img src={product.product.imageUrl} alt="Product image" />
                <h3>{product.product.name}</h3>
                <p>{product.product.description.length >= 40 ? (product.product.description.substring(0, 40) + "...") : (product.product.description)}</p>
                <p>{product.product.price} $</p>
            </div>
        </div>
    )
}

export default Product;