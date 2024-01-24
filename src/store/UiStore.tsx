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
            <div className="alert alert-success" key={Date.now()}>
                <div>{message}</div>
                <button className="btn-close close-button" onClick={() => this.RemoveAlert(message)}></button>
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
            <div className="alert alert-info" key={Date.now()}>
                <div>{message}</div>
                <button className="btn-close close-button" onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
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
            <div className="alert alert-warning" key={Date.now()}>
                <div>{message}</div>
                <button className="btn-close close-button" onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
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
            <div className="alert alert-danger" key={Date.now()}>
                <div>{message}</div>
                <button className="btn-close close-button" onClick={() => this.RemoveAlert(message)}><AiOutlineClose/></button>
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