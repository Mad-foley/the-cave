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
        <div className='container mx-auto flex justify-content p-5 text-center'>
            <form className='w-full max-w-xs shadow p-5' onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <div className='mb-4 field'>
                    <input
                    onChange={handleFormData}
                    name="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <input
                    onChange={handleFormData}
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button
                className='inline-block align-basline font-bold text-sm text-blue-500 hover:text-blue-800'
                >Log In</button>
            </form>
        </div>
    )
}
