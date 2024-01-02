import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore'
import { useEffect, useRef, useState } from 'react'
import {AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineShoppingCart} from "react-icons/ai";

const Header = observer(() => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const handleClick = () => {
        setDropdownIsOpen(!dropdownIsOpen);
    };

    const HandleLogout = () => {
        AuthStore.token = "";
    }

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event:any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    return (
        <div>
            <div>
                <Link to='/'>OnlineStore</Link>
            </div>
            <div>
                {AuthStore.token === "" ? (
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/registration'>Registration</Link>
                    </div>
                )
                    :
                    (
                        <div ref={dropdownRef}>
                            <Link to={"/basket"}><AiOutlineShoppingCart /></Link>
                            <button onClick={handleClick}>{AuthStore.email} {dropdownIsOpen ? (<AiOutlineCaretUp/>) : (<AiOutlineCaretDown/>)}</button>
                            {dropdownIsOpen && (<ul>
                                <li><Link to="/profile">Profile</Link></li>
                                {AuthStore.role === "Admin" ? (
                                    <>
                                        <li><Link to="/admin">Admin panel</Link></li>
                                        <li><Link to="/seller">Seller panel</Link></li>
                                    </>
                                ) : (<></>)}
                                {AuthStore.role === "Seller" ? (<><Link to="/seller">Seller panel</Link></>) : (<></>)}
                                <li><button onClick={HandleLogout}>Log Out</button></li>
                            </ul>)}
                        </div>
                    )}
            </div>
        </div>
    )
})

export default Header