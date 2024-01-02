import AlertBox from '../AlertBox/AlertBox'
import Header from '../Header/Header'


export default function Layout(props: any) {
    return (
        <div>
            <Header></Header>
            <AlertBox></AlertBox>
            <div>
                {props.children}
            </div>
        </div>
    )
}