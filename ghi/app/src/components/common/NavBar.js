import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetTokenQuery } from "../../store/queries/authApi";
import LogOutForm from "../accounts/LogOutModal";
import LogInForm from "../accounts/LogInModal";


export default function NavBar({setBlur}) {
    const [logoutWindow, setLogoutWindow] = useState(false)
    const [loginWindow, setLoginWindow] = useState(false)
    const [logged, setLogged] = useState(false)
    const {data:token} = useGetTokenQuery()

    const handleLogoutWindow = () => {
        setLogoutWindow(true)
        setBlur(true)
    }
    const handleLoginWindow = () => {
        setLoginWindow(true)
        setBlur(true)
    }
    const navlinkClass = 'navbutton block py-2 pl-3 pr-4 font-medium rounded-xl dark:color-white'
    return (
        <div>
            <nav className="px-2 pt-3 sticky top-0 bg-wine z-20">
                <div className="grid grid-cols-3 ml-5 mr-5 p-3">
                    <ul className="flex items-center">
                        <li>
                            <NavLink to='/' className="flex items-center pr-5">
                                <span className="custom-type top-2 left-6" style={{fontSize:'60px'}}>C</span>
                                <span className="font-bold text-xl">CAVE</span>
                            </NavLink>
                        </li>
                        <li className={navlinkClass}>
                            <NavLink to='/recommendations'>Recommendations</NavLink>
                        </li>
                    </ul>
                    <ul className="flex justify-center">
                        <li className={navlinkClass}>
                            <NavLink to='/'  aria-current="page">Home</NavLink>
                        </li>
                        <li className={navlinkClass}>
                            <NavLink to='/wines'  aria-current="page">Collection</NavLink>
                        </li>
                        <li className={navlinkClass}>
                            {token && <NavLink to='/wines/create'  aria-current="page">Create</NavLink>}
                        </li>
                    </ul>
                    <ul className="flex justify-end">
                        <li className={navlinkClass}>
                            {token && <NavLink to="/account">Account</NavLink>}
                        </li>
                        <li className={navlinkClass}>
                            {logged || token ? <button onClick={handleLogoutWindow}>Logout</button> : <button onClick={handleLoginWindow}>Login</button>}
                        </li>
                    </ul>
                </div>
            </nav>
        {loginWindow && <LogInForm setLogged={setLogged} setLoginWindow={setLoginWindow} setBlur={setBlur}/>}
        {logoutWindow && <LogOutForm setLogoutWindow={setLogoutWindow} setLogged={setLogged} setBlur={setBlur}/>}
        </div>
    )
}
