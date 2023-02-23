import { useLogOutMutation } from "../../store/queries/authApi"

export default function LogOutForm() {
    const [logOut] = useLogOutMutation()

    const handleClick = () => {
        logOut()
    }

    return (
        <div className="">
            <button
            onClick={handleClick}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >Log out</button>
        </div>
    )
}
