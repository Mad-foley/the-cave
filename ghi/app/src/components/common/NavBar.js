import { NavLink } from "react-router-dom";
import { logo } from "../../utilities/constants";
import LogOutForm from "../accounts/LogOutModal";

export default function NavBar() {
    const navlinkClass = 'container py-2 pr-4 pl-3 text-white text-xl border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
    return (
        <nav className="shadow">
            <div className="flex flex-column-2">
                <div className="container"><img src={logo} style={{width:"30px"}}/></div>
                <div className="w-full">
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
                        <li className={navlinkClass}>
                            <LogOutForm />
                        </li>
                    </ul>
                    </div>
                </div>
        </nav>
    )
}
