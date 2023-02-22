import { useDeleteUserMutation } from "../../store/queries/authApi"

export default function DeleteUserForm() {
    const [deleteUser] = useDeleteUserMutation()

    const handleClick = () => {
        deleteUser();
        console.log(true)
    }

    return (
        <div>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}
