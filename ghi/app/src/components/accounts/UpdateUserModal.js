import { useUpdateUserMutation } from "../../store/queries/authApi"
import { useState } from "react"
import { useGetTokenQuery } from "../../store/queries/authApi"

export default function UpdateUserForm({ count }) {
    const {data : token_data } = useGetTokenQuery()
    const [formData, setFormData] = useState({})
    const [updateUser] = useUpdateUserMutation()
    if (token_data) {

    }
    const handleFormChange = (e) => {
        setFormData( {
            ...formData,
            [e.target.name]: e.target.value
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        count(1)
        let user_id = token_data.user.id
        updateUser(formData, user_id)
    }
    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    return (
        <div className="container mx-auto flex justify-center p-5 text-center">
            <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}>
                <input
                className={inputClass}
                placeholder="Full name"
                onChange={handleFormChange} name="name" />
                <input
                className={inputClass}
                placeholder="Username"
                onChange={handleFormChange} name="username"/>
                <input
                className={inputClass}
                placeholder="Password"
                onChange={handleFormChange} name="password"/>
                <input
                className={inputClass}
                onChange={handleFormChange} type="date" name="birthday"/>
                <input
                className={inputClass}
                placeholder="Profile picture URL"
                onChange={handleFormChange} name="image_url"/>
                <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >Update</button>
            </form>
        </div>
    )
}
