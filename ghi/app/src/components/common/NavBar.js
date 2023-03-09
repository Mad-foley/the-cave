import { NavLink } from "react-router-dom";
import { useGetTokenQuery } from "../../store/queries/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setBlur, setLoginWindow, setLogoutWindow } from "../../store/queries/modalSlice";


export default function NavBar() {

    const {data:token} = useGetTokenQuery()
    const dispatch = useDispatch()
    const data = useSelector(state => state.modalWindow)

    const handleLogoutWindow = () => {
        dispatch(setLogoutWindow(true))
        dispatch(setBlur(true))
    }

    const handleLoginWindow = () => {
        dispatch(setLoginWindow(true))
        dispatch(setBlur(true))
    }

    const navlinkClass = 'navbutton py-2 px-2 mx-2 rounded-xl'
    return (
            <nav className="px-2 pt-3 sticky top-0 z-40 bg-[#73343A] dark:bg-[#0E0604]">
                <div className="grid grid-cols-3 ml-5 mr-5 p-3">
                    <ul className="flex items-center">
                        <li>
                            <NavLink to='/' className="flex items-center pr-5">
                                <span className="custom-type top-2 left-6" style={{fontSize:'60px'}}>C</span>
                                <span className="font-bold text-xl z-30 main-logo">CAVE</span>
                            </NavLink>
                        </li>

                    </ul>
                    <ul className="flex justify-center">
                        <li className={navlinkClass}>
                            <NavLink to='/wines'  aria-current="page">Collection</NavLink>
                        </li>
                        <li className={navlinkClass}>
                            <NavLink to='/recommendations'>Recommendations</NavLink>
                        </li>
                        {token &&
                        <li className={navlinkClass}>
                            <NavLink to='/wines/create'  aria-current="page">Create</NavLink>
                        </li>}
                    </ul>
                    <ul className="flex justify-end">
                        {token &&
                        <li className={navlinkClass}>
                             <NavLink to="/account">Account</NavLink>
                        </li>
                        }
                        <li className={navlinkClass}>
                            {data.logged || token ? <button onClick={handleLogoutWindow}>Logout</button> : <button onClick={handleLoginWindow}>Login</button>}
                        </li>
                    </ul>
                </div>
            </nav>
    )
}
