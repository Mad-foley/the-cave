import { useState } from 'react'
import { useLogInMutation } from '../../store/queries/authApi'

export default function LogInForm({setLogged, setLoginWindow}) {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await logIn(formData)
        console.log(result)
        if (!result.error) {
            setLogged(true)
            setLoginWindow(false)
        }

    }
    return (
        <div className='container fixed flex justify-center p-5 z-10'>
            <div className='shadow bg-slate-200 rounded'>
                <button
                onClick={()=>{
                    setLoginWindow(false)
                }}
                className='text-black p-3'>X</button>
                <h1 className='text-lg font-bold text-black pb-3 text-center'>Login</h1>
                <form className='max-w-xs pl-10 pr-10 text-center pb-3' onSubmit={handleSubmit}>
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
                    className='pt-3 pb-3 inline-block align-basline font-bold text-sm text-blue-500 hover:text-blue-800'
                    >Log In</button>
                </form>
            </div>
        </div>
    )
}
