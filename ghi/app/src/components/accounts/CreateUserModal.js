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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFormChange} name="name" />
                <input onChange={handleFormChange} name="username"/>
                <input onChange={handleFormChange} name="password"/>
                <input onChange={handleFormChange} type="date" name="birthday"/>
                <input onChange={handleFormChange} name="image_url"/>
                <button>Submit</button>
            </form>
        </div>
    )
}
