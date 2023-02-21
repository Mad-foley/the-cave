import { useState } from 'react'
import { useLogInMutation } from '../../store/queries/authApi'

export default function LogInForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [logIn] = useLogInMutation()

    const handleFormData = (e) => {
        setFormData(
            {
                ...formData,
                [e.currentTarget.name]: e.currentTarget.value,
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(formData)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFormData} name="username" />
                <input onChange={handleFormData} name="password" />
                <button>Submit</button>
            </form>
        </div>
    )
}
