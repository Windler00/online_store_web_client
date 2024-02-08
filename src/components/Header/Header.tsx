import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./header.module.css"
import SearchApi from '../../api/SearchApi';
import ProductApi from '../../api/ProductApi';

const Header = observer(() => {

    const [isLoading, setIsLoading] = useState(false);

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

    const [searchText, setSearchText] = useState("");
    const handleSetSearch = (event: any) => {
        setSearchText(event.target.value);
    }

    const handleSearch = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        if (searchText === ""){
            await ProductApi.getProducts(1,10)
        }
        else{
            await SearchApi.searchProducts(searchText, 1,40)
        }
        setIsLoading(false);
    }

    return (
        <div className={styles.Header}>
            <div className={styles.Left}>
                <Link className='btn btn-dark' to='/'>OnlineStore</Link>
            </div>
            <div className={styles.Center}>
                <div className={styles.Search}>
                    <form onSubmit={handleSearch}>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Type to search...'
                            value={searchText}
                            onChange={handleSetSearch}
                        >
                        </input>
                        {isLoading ?
                            (<div className={styles.Spinner}>
                                <div className="spinner-border spinner-border-sm opacity-50" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>)
                            : null}
                        <button type='submit' className='btn btn-dark'>Search</button>
                    </form>
                </div>
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