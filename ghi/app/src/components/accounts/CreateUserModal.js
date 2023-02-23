import { useCreateUserMutation } from "../../store/queries/authApi"
import { useState } from "react"

export default function CreateUserForm() {
    const [formData, setFormData] = useState({})
    const [createUser] = useCreateUserMutation()

    const handleFormChange = (e) => {
        setFormData( {
            ...formData,
            [e.target.name]: e.target.value
        }
        )

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(formData)
    }
    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    return (
        <div className="container mx-auto flex justify-center p-5 text-center">
            <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                onChange={handleFormChange}
                name="name"
                placeholder='Full name'
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="username"
                placeholder='Username'
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input
                onChange={handleFormChange}
                type="date"
                name="birthday"
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="image_url"
                placeholder="Profile picture URL"
                className={inputClass}/>
                <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >Submit</button>
            </form>
        </div>
    )
}
