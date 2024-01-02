import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import AuthStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";
import ProductApi from "../../api/ProductApi";


const Seller = observer(() => {
    useEffect(() => {
        const fetch = async () => {
            ProductApi.getProducts(1, 10)
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
        await ProductApi.createProduct(productName, productDescription, productPrice,productQuantity)
        if (uploadImage !== null) {
            ProductApi.uploadImage(uploadImage, ProductStore.id)
        }
        ProductApi.getProducts(1, 10)
    }

    const changeProductSubmit = async (event: any) => {
        event.preventDefault();
        if (productId !== undefined) {
            await ProductApi.changeProduct(productId, productName, productDescription, productPrice,productQuantity)
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
                        <button key={product.id} onClick={() => handleSelectProduct(product.id, product.name, product.description, product.price, product.quantity)}>
                            <div key={product.id}>
                                <img src={product.imageUrl} alt="Product image" />
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

    const handlerChangeCurrentPage = async (event: any) => {
        if (event.target.value >= 1 && event.target.value <= ProductStore.pages) {
            ProductApi.getProducts(event.target.value, ProductStore.pageSize)
        }
    }

    return (
        <div>
            <div>
                {AuthStore.role !== "Seller" && AuthStore.token === "" ? (<Navigate to={"/"} replace={true} />) : (<></>)}
                <>
                    <div>
                        <HandleProducts />
                    </div>
                </>
                {createProduct ? (<div>
                    <form>
                        <h1>Create product</h1>
                        <label>Product name *</label>
                        <input value={productName} onChange={handleProductNameChange} />
                        <label>Product description *</label>
                        <input value={productDescription} onChange={handleProductDescriptionChange} />
                        <label>Product price *</label>
                        <input type="number" value={productPrice} onChange={handleProductPriceChange}></input>
                        <label>Product Quantity *</label>
                        <input type="number" value={productQuantity} onChange={handleProductQuantityChange}></input>
                        <div>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        <button type="submit" onClick={createProductSubmit}>Submit</button>
                    </form>
                </div>)
                    :
                    (<div>
                        <button disabled={createProduct} onClick={handleSetCreateProduct}>Create new product</button>
                        <form>
                            <h1>Change product</h1>
                            <label>Product id*</label>
                            <input value={productId} onChange={handleProductIdChange}></input>
                            <label>Product name *</label>
                            <input value={productName} onChange={handleProductNameChange} />
                            <label>Product description *</label>
                            <input value={productDescription} onChange={handleProductDescriptionChange} />
                            <label>Product price *</label>
                            <input type="number" value={productPrice} onChange={handleProductPriceChange}></input>
                            <label>Product Quantity *</label>
                            <input type="number" value={productQuantity} onChange={handleProductQuantityChange}></input>
                            <div>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                            <div>
                                <button type="submit" onClick={changeProductSubmit}>Submit</button>
                                <button onClick={deleteProductSubmit}>Delete</button>
                            </div>
                        </form>
                    </div>)}
            </div>
            <div>
                {ProductStore.currentPage === 1 ? (<button disabled>Previous</button>) : <button onClick={() => decreasePage()}>Previous</button>}
                <input type="text" value={ProductStore.currentPage} onChange={handlerChangeCurrentPage}></input>
                {ProductStore.currentPage === ProductStore.pages ? <button disabled>Next</button> : <button onClick={() => increasePage()}>Next</button>}
                <p>Pages 1 - {ProductStore.pages}</p>
            </div>
        </div>
    )
})

export default Seller