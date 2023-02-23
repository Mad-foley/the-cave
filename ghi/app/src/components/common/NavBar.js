import { NavLink } from "react-router-dom";


export default function NavBar() {
    const navlinkClass = 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <NavLink to="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CAVE</span>
                </NavLink>

                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <div className="flex justify-evenly">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li className={navlinkClass}>
                            <NavLink to='/home'  aria-current="page">Home</NavLink>
                        </li>
                        <li className={navlinkClass}>
                            <NavLink to='/account'  aria-current="page">Account</NavLink>
                        </li>
                        <li className={navlinkClass}>
                            <NavLink to='/wines'  aria-current="page">Wines</NavLink>
                        </li>
                        <li className={navlinkClass} >
                            <NavLink to='/' aria-current="page">About</NavLink>
                        </li>
                        <li className={navlinkClass}>
                            <NavLink to='/'  aria-current="page">Contact</NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
