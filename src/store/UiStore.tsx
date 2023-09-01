import Alert from '@mui/material/Alert/Alert';
import { action, makeAutoObservable, observable } from 'mobx';

class UiStore {
    constructor() {
        makeAutoObservable(this)
    }
    @observable AlertStore: React.ReactNode[] = [];


    @action
    AddSuccessAlert(message: string) {
        const alert = (
            <Alert severity="success" key={Date.now()} onClose={() => this.RemoveAlert(message)}>
                {message}
            </Alert>
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
            <Alert severity="info" key={Date.now()} onClose={() => this.RemoveAlert(message)}>
                {message}
            </Alert>
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
            <Alert severity="warning" key={Date.now()} onClose={() => this.RemoveAlert(message)}>
                {message}
            </Alert>
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
            <Alert severity="error" key={Date.now()} onClose={() => this.RemoveAlert(message)}>
                {message}
            </Alert>
        )
        this.AlertStore.push(alert)

        const timer = setTimeout(() => {
            this.RemoveAlert(message);
        }, 5000);

        return () => clearTimeout(timer);
    }

    @action
    RemoveAlert(message: string){
        this.AlertStore.splice(this.AlertStore.indexOf(message, 1))
    }


}

export default new UiStore();