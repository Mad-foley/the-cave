import { useDeleteUserMutation } from "../../store/queries/authApi"

export default function DeleteUserForm() {
    const [deleteUser] = useDeleteUserMutation()

    const handleClick = () => {
        deleteUser();
    }
    return (
        <div>
            <button
            onClick={handleClick}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >Delete</button>
        </div>
    )
}
