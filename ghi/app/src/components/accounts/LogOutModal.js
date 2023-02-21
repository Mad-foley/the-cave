import { useLogOutMutation } from "../../store/queries/authApi"

export default function LogOutForm() {
    const [logOut] = useLogOutMutation()

    const handleClick = () => {
        logOut()
    }

    return (
        <div>
            <button onClick={handleClick}>Log out</button>
        </div>
    )
}
