import apiUrl from "../config";
import AuthStore from "../store/AuthStore";
import UiStore from "../store/UiStore";

class BasketApi{
    addProduct = async(productId:number, quantity:number) =>{
        try{
            const response = fetch(apiUrl + 'basket/addproduct?productid='+ productId +"&quantity="+ quantity, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStore.token}`
                },
            })
            const data = await (await response).json()
            if(data.success !== undefined){
                UiStore.AddSuccessAlert(data.success)
            }
            if(data.error !== undefined){
                UiStore.AddErrorAlert(data.error)
            }
        }
        catch(error:any){
            console.log(error)
        }
    }
}

export default new BasketApi();