import { useUpdateUserMutation } from "../../store/queries/userApi"
import { useState } from "react"
import { useGetTokenQuery } from "../../store/queries/authApi"

export default function UpdateUserForm() {
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
        updateUser(formData, token_data.user.id)
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
