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
        <div className='container mx-auto shadow p-5'>
            <form className='shadow p-5' onSubmit={handleSubmit}>
                <input onChange={handleFormData} name="username" />
                <input onChange={handleFormData} name="password" />
                <button>test</button>
            </form>
        </div>
    )
}
