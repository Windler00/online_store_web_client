import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./header.module.css"

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
        const handleOutsideClick = (event: any) => {
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
        <div className={styles.Header}>
            <div className={styles.Left}>
                <Link className='btn btn-dark' to='/'>OnlineStore</Link>
            </div>
            <div className={styles.Right}>
                {AuthStore.token === "" ? (
                    <div>
                        <Link className='btn btn-dark' to='/login'>Login</Link>
                        <Link className='btn btn-dark' to='/registration'>Registration</Link>
                    </div>
                )
                    :
                    (
                        <div ref={dropdownRef}>
                            <Link className='btn btn-dark' to={"/basket"}><AiOutlineShoppingCart /></Link>
                            <button className='btn btn-dark' onClick={handleClick}>{AuthStore.email} {dropdownIsOpen ? (<AiOutlineCaretUp />) : (<AiOutlineCaretDown />)}</button>
                            {dropdownIsOpen && (<ul className={styles.DropdownMenu}>
                                <li><Link className='btn btn-dark' to="/profile">Profile</Link></li>
                                <li><Link className='btn btn-dark' to="/orders">Orders</Link></li>
                                {AuthStore.role === "Admin" ? (
                                    <>
                                        <li><Link className='btn btn-dark' to="/admin">Admin panel</Link></li>
                                        <li><Link className='btn btn-dark' to="/seller">Seller panel</Link></li>
                                    </>
                                ) : (<></>)}
                                {AuthStore.role === "Seller" ? (<><Link className='btn btn-dark' to="/seller">Seller panel</Link></>) : (<></>)}
                                <li><button className='btn btn-dark' onClick={HandleLogout}>Log Out</button></li>
                            </ul>)}
                        </div>
                    )}
            </div>
        </div>
    )
})

export default Header