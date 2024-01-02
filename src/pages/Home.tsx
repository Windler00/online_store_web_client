import { useEffect } from "react"
import ProductStore from "../store/ProductStore"
import { observer } from "mobx-react-lite"
import ProductApi from "../api/ProductApi";
import Product from "../components/Product/Product";


const Home = observer(() => {

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

    const handlerChangeCurrentPage = async (event:any) => {
        if(event.target.value >= 1 && event.target.value <= ProductStore.pages){
            ProductApi.getProducts(event.target.value, ProductStore.pageSize)
        }
     }


    useEffect(() => {
        const fetch = async () => {
            ProductApi.getProducts(1, 10)
        }
        fetch()


    }, [])
    return (
        <div>
            <div>
                {ProductStore.products.map(product => <Product product={product}/>)}
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

export default Home