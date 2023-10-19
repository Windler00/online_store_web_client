import { observer } from "mobx-react-lite";
import styles from "./seller.module.css"
import { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";


const Seller = observer(() => {
    useEffect(() => {
        const fetch = async () => {
            ProductStore.getProducts(0, 30)
        }
        fetch()
    }, [])

    const [productId, setProductId] = useState<number>();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const handleProductIdChange = (event: any) => {
        setProductId(event.target.value);
    }

    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event: any) => {
        setProductDescription(event.target.value);
    };

    const [uploadImage, setUploadImage] = useState<File | null>(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setUploadImage(file);
    };

    const [createProduct, setCreateProduct] = useState(true);

    const handleSetCreateProduct = (event: any) => {
        event.preventDefault();
        setCreateProduct(true)
    }

    const handleSelectProduct = (id: number, name: string, description: string) => {
        ProductStore.id = id;
        ProductStore.name = name;
        ProductStore.description = description;
        setProductId(ProductStore.id);
        setProductName(ProductStore.name);
        setProductDescription(ProductStore.description);
        setCreateProduct(false);
    }

    const createProductSubmit = async (event: any) => {
        event.preventDefault();
        await ProductStore.createProduct(productName, productDescription)
        if (uploadImage !== null) {
            ProductStore.uploadImage(uploadImage, ProductStore.id)
        }
        ProductStore.getProducts(0, 30)
    }

    const changeProductSubmit = async (event: any) => {
        event.preventDefault();
        if (productId !== undefined) {
            await ProductStore.changeProduct(productId, productName, productDescription)
        }
        if (uploadImage !== null) {
            ProductStore.uploadImage(uploadImage, ProductStore.id)
        }
        ProductStore.getProducts(0, 30)
    }

    const deleteProductSubmit = async (event: any) => {
        event.preventDefault();
        await ProductStore.deleteProduct();
        await ProductStore.getProducts(0, 30)
    }

    const HandleProducts = observer(() => {
        const image = "https://img.ixbt.site/live/topics/preview/00/01/67/69/c989bed929.png"
        let result: any[] = [];
        if (ProductStore.products !== undefined) {
            ProductStore.products?.map((product =>
                result.push(
                    <>
                        <button key={product.id} onClick={() => handleSelectProduct(product.id, product.name, product.description)}>
                            <div key={product.id} className={styles.ProductCard}>
                                <img src={image} alt="Product image" />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                        </button>
                    </>
                )
            ))
        }
        return (
            <>
                {result}
            </>
        )
    })

    return (
        <div className={styles.Seller}>
            {AuthStore.role !== "Seller" && AuthStore.token === "" ? (<Navigate to={"/"} replace={true} />) : (<></>)}
            <div className={styles.Products}>
                <HandleProducts />
            </div>
            {createProduct ? (<div className={styles.CreateProduct}>
                <h1>Create product</h1>
                <label>Product name *</label>
                <input value={productName} onChange={handleProductNameChange} />
                <label>Product description *</label>
                <input value={productDescription} onChange={handleProductDescriptionChange} />
                <input type="file" onChange={handleFileChange} />
                <button onClick={createProductSubmit}>Submit</button>
            </div>)
                :
                (<div className={styles.ChangeProduct}>
                    <button disabled={createProduct} onClick={handleSetCreateProduct}>Create new product</button>
                    <h1>Change product</h1>
                    <label>Product id*</label>
                    <input value={productId} onChange={handleProductIdChange}></input>
                    <label>Product name *</label>
                    <input value={productName} onChange={handleProductNameChange} />
                    <label>Product description *</label>
                    <input value={productDescription} onChange={handleProductDescriptionChange} />
                    <input type="file" onChange={handleFileChange} />
                    <div>
                        <button onClick={changeProductSubmit}>Submit</button>
                        <button onClick={deleteProductSubmit}>Delete</button>
                    </div>
                </div>)}
        </div>
    )
})

export default Seller