import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetTokenQuery } from "../../store/queries/authApi";
import { logo } from "../../utilities/constants";
import LogOutForm from "../accounts/LogOutModal";
import LogInForm from "../accounts/LogInModal";


export default function NavBar() {
    const [logoutWindow, setLogoutWindow] = useState(false)
    const [loginWindow, setLoginWindow] = useState(false)
    const [logged, setLogged] = useState(false)
    const {data:token} = useGetTokenQuery()

    const handleLogoutWindow = () => {
        setLogoutWindow(true)
    }
    const handleLoginWindow = () => {
        setLoginWindow(true)
    }

    const navlinkClass = 'block py-2 pl-3 pr-4 hover:text-blue-500 font-medium'
    return (
        <nav className="px-2">
            <div className="flex items-center justify-between ml-5 mr-5">
                <NavLink to='/' className="flex items-center">
                    <img src={logo} className='h-6 mr-3 sm:h-9'/>
                    <span className="font-bold text-xl">CAVE</span>
                </NavLink>
                <ul className="flex">
                    <li className={navlinkClass}>
                        <NavLink to='/home'  aria-current="page">Home</NavLink>
                    </li>
                    <li className={navlinkClass}>
                        <NavLink to='/wines/account'  aria-current="page">Collection</NavLink>
                    </li>
                    <li className={navlinkClass}>
                        <NavLink to='/create/wine'  aria-current="page">Create</NavLink>
                    </li>
                </ul>
                <ul className="flex">
                    <li className={navlinkClass}>
                        <NavLink to="/account">Account</NavLink>
                    </li>
                    <li className={navlinkClass}>
                        {logged || token ? <button onClick={handleLogoutWindow}>Logout</button> : <button onClick={handleLoginWindow}>Login</button>}
                    </li>
                </ul>
            </div>
            {loginWindow ? <LogInForm setLogged={setLogged} setLoginWindow={setLoginWindow}/> : <div></div>}
            {logoutWindow ? <LogOutForm setLogoutWindow={setLogoutWindow}/> : <div></div>}
        </nav>
    )
}
