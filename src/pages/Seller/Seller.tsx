import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";
import ProductApi from "../../api/ProductApi";
import styles from './seller.module.css'
import Product from "../../components/Product/Product";


const Seller = observer(() => {
    useEffect(() => {
        const fetch = async () => {
            ProductApi.getProducts(1, 24)
        }
        fetch()
    }, [])

    const [productId, setProductId] = useState<number>();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productQuantity, setProductQuantity] = useState<number>(0);

    const handleProductIdChange = (event: any) => {
        setProductId(event.target.value);
    }

    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event: any) => {
        setProductDescription(event.target.value);
    };

    const handleProductPriceChange = (event: any) => {
        setProductPrice(event.target.value);
    }

    const handleProductQuantityChange = (event: any) => {
        setProductQuantity(event.target.value);
    }

    const [uploadImage, setUploadImage] = useState<File | null>(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setUploadImage(file);
    };

    const [createProduct, setCreateProduct] = useState(true);

    const handleSetCreateProduct = (event: any) => {
        event.preventDefault();
        setProductName("");
        setProductDescription("");
        setProductPrice(0);
        setProductQuantity(0);
        setCreateProduct(true)
    }

    const handleSelectProduct = (id: number, name: string, description: string, price: number, quantity: number) => {
        ProductStore.id = id;
        ProductStore.name = name;
        ProductStore.description = description;
        ProductStore.price = price;
        ProductStore.quantity = quantity;
        setProductId(ProductStore.id);
        setProductName(ProductStore.name);
        setProductDescription(ProductStore.description);
        setProductPrice(ProductStore.price);
        setProductQuantity(ProductStore.quantity);
        setCreateProduct(false);
    }

    const createProductSubmit = async (event: any) => {
        event.preventDefault();
        await ProductApi.createProduct(productName, productDescription, productPrice, productQuantity)
        if (uploadImage !== null) {
            ProductApi.uploadImage(uploadImage, ProductStore.id)
        }
        ProductApi.getProducts(1, 10)
    }

    const changeProductSubmit = async (event: any) => {
        event.preventDefault();
        if (productId !== undefined) {
            await ProductApi.changeProduct(productId, productName, productDescription, productPrice, productQuantity)
        }
        if (uploadImage !== null) {
            ProductApi.uploadImage(uploadImage, ProductStore.id)
        }
        ProductApi.getProducts(1, 10)
    }

    const deleteProductSubmit = async (event: any) => {
        event.preventDefault();
        await ProductApi.deleteProduct();
        await ProductApi.getProducts(1, 10)
    }

    const HandleProducts = observer(() => {
        let result: any[] = [];
        if (ProductStore.products !== undefined) {
            ProductStore.products?.map((product =>
                result.push(
                    <>
                        <button className="m-2" key={product.id} onClick={() => handleSelectProduct(product.id, product.name, product.description, product.price, product.quantity)}>
                            <Product product={product} />
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

    const decreasePage = async () => {
        if (ProductStore.currentPage >= 1) {
            ProductApi.getProducts(ProductStore.currentPage - 1, ProductStore.pageSize)
        }
    }

    const increasePage = async () => {
        if (ProductStore.currentPage <= ProductStore.pages) {
            ProductApi.getProducts(ProductStore.currentPage + 1, ProductStore.pageSize)
        }
    }

    const handlerChangeCurrentPage = async (value: any) => {
        if (value >= 1 && value <= ProductStore.pages) {
            ProductApi.getProducts(value, ProductStore.pageSize)
        }
    }

    return (
        <div className="m-2">
            <div className={styles.Seller}>
                {AuthStore.role !== "Seller" && AuthStore.token === "" ? (<Navigate to={"/"} replace={true} />) : (<></>)}
                <>
                    <div className={styles.Products}>
                        <HandleProducts />
                    </div>
                </>
                {createProduct ? (
                    <div className={styles.ChangeProduct}>
                        <form>
                            <h1>Create product</h1>
                            <label>Product name *</label>
                            <input className="form-control mt-1 mb-1" value={productName} onChange={handleProductNameChange} />
                            <label>Product description *</label>
                            <input className="form-control mt-1 mb-1" value={productDescription} onChange={handleProductDescriptionChange} />
                            <label>Product price *</label>
                            <input className="form-control mt-1 mb-1" type="number" value={productPrice} onChange={handleProductPriceChange}></input>
                            <label>Product Quantity *</label>
                            <input className="form-control mt-1 mb-1" type="number" value={productQuantity} onChange={handleProductQuantityChange}></input>
                                <input className="form-control mt-1 mb-1" type="file" onChange={handleFileChange} />
                            <button className="btn btn-dark" type="submit" onClick={createProductSubmit}>Submit</button>
                        </form>
                    </div>)
                    :
                    (<div className={styles.ChangeProduct}>
                        <div>
                            <button className="btn btn-dark" disabled={createProduct} onClick={handleSetCreateProduct}>Create new product</button>
                        </div>
                        <form>
                            <h1>Change product</h1>
                            <label>Product id*</label>
                            <input className="form-control mt-1 mb-1" value={productId} onChange={handleProductIdChange}></input>
                            <label>Product name *</label>
                            <input className="form-control mt-1 mb-1" value={productName} onChange={handleProductNameChange} />
                            <label>Product description *</label>
                            <input className="form-control mt-1 mb-1" value={productDescription} onChange={handleProductDescriptionChange} />
                            <label>Product price *</label>
                            <input className="form-control mt-1 mb-1" type="number" value={productPrice} onChange={handleProductPriceChange}></input>
                            <label>Product Quantity *</label>
                            <input className="form-control mt-1 mb-1" type="number" value={productQuantity} onChange={handleProductQuantityChange}></input>
                            <div>
                                <input className="form-control mt-1 mb-1" type="file" onChange={handleFileChange} />
                            </div>
                            <div>
                                <button className="btn btn-dark" type="submit" onClick={changeProductSubmit}>Submit</button>
                                <button className="btn btn-dark" onClick={deleteProductSubmit}>Delete</button>
                            </div>
                        </form>
                    </div>)}
            </div>
            <div className={styles.PagesNav}>
                {ProductStore.currentPage === 1 ? (<button className="btn btn-dark" disabled>Previous</button>) : <button className="btn btn-dark" onClick={() => decreasePage()}>Previous</button>}
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            Array.from({ length: ProductStore.pages }, (_, index) => (
                                ProductStore.currentPage === index + 1 ?
                                    (<li className="page-item" key={index}><button disabled className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                    : index + 1 === 1 ?
                                        (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                        : index + 1 === ProductStore.pages ?
                                            (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                            : ProductStore.currentPage === index ?
                                                (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                : ProductStore.currentPage === index + 1 ?
                                                    (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                    : ProductStore.currentPage === index + 2 ?
                                                        (<li className="page-item" key={index}><button className="btn btn-dark" onClick={() => handlerChangeCurrentPage(index + 1)}>{index + 1}</button></li>)
                                                        :
                                                        (null)
                            ))
                        }
                    </ul>
                </nav>
                {ProductStore.currentPage === ProductStore.pages ? <button className="btn btn-dark" disabled>Next</button> : <button className="btn btn-dark" onClick={() => increasePage()}>Next</button>}
            </div>
        </div>
    )
})

export default Seller