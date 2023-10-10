import { action, makeAutoObservable, observable } from 'mobx';
import { AiOutlineClose } from "react-icons/ai";

class UiStore {
    constructor() {
        makeAutoObservable(this)
    }
    @observable AlertStore: React.ReactNode[] = [];


    @action
    AddSuccessAlert(message: string) {
        const alert = (
            <div className='success' key={Date.now()}>
                <p className='success-message'>{message}</p>
                <button className='success-button' onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
            </div>
        )
        this.AlertStore.push(alert)

        const timer = setTimeout(() => {
            this.RemoveAlert(message);
        }, 5000);

        return () => clearTimeout(timer);
    }
    @action
    AddInfoAlert(message: string) {
        const alert = (
            <div className='info' key={Date.now()}>
                <p className='info-message'>{message}</p>
                <button className='info-button' onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
            </div>
        )
        this.AlertStore.push(alert)

        const timer = setTimeout(() => {
            this.RemoveAlert(message);
        }, 5000);

        return () => clearTimeout(timer);
    }
    @action
    AddWarningAlert(message: string) {
        const alert = (
            <div className='warning' key={Date.now()}>
                <p className='warning-message'>{message}</p>
                <button className='warning-button' onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
            </div>
        )
        this.AlertStore.push(alert)

        const timer = setTimeout(() => {
            this.RemoveAlert(message);
        }, 5000);

        return () => clearTimeout(timer);
    }
    @action
    AddErrorAlert(message: string) {
        const alert = (
            <div className='error' key={Date.now()}>
                <p className='error-message'>{message}</p>
                <button className='error-button' onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
            </div>
        )
        this.AlertStore.push(alert)

        const timer = setTimeout(() => {
            this.RemoveAlert(message);
        }, 5000);

        return () => clearTimeout(timer);
    }

    @action
    RemoveAlert(message: string) {
        this.AlertStore.splice(this.AlertStore.indexOf(message, 1))
    }


}

export default new UiStore();