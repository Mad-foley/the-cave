import { useState } from 'react'
import { useLogInMutation } from '../../store/queries/authApi'
import { useNavigate } from 'react-router-dom'

export default function LogInForm({setLogged, setLoginWindow, setBlur}) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [logIn] = useLogInMutation()
    const navigate = useNavigate()
    const [shake, setShake] = useState('')
    const handleFormData = (e) => {
        setFormData(
            {
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            }
        )
    }

    const handleSubmit = async (e) => {
        setShake('')
        e.preventDefault()
        const result = await logIn(formData)
        if (!result.error) {
            setLogged(true)
            setLoginWindow(false)
            setBlur(false)
        }
        else {
            setShake('wine-login')
        }

    }

    const handleCreateUser = () => {
        setLoginWindow(false)
        setBlur(false)
        navigate('/account/create')
    }
    const loginContainerClass = `${shake} container fixed flex justify-center m-10 p-10 z-10`
    return (
        <div className={loginContainerClass}>
            <div className='shadow bg-slate-200 rounded'>
                <button
                onClick={()=>{
                    setLoginWindow(false)
                    setBlur(false)
                }}
                className='text-black p-3'>X</button>
                <h1 className='text-lg font-bold text-black pb-3 text-center'>Welcome</h1>
                <form className='max-w-xs pl-10 pr-10 text-center' onSubmit={handleSubmit}>
                    <div className='mb-4 field'>
                        <input
                        onChange={handleFormData}
                        name="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div>
                        <input
                        onChange={handleFormData}
                        type="password"
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button
                    className='pt-3 pb-3 inline-block align-basline font-bold text-sm text-blue-500 hover:text-blue-800'
                    >Log In</button>
                </form>
                <div className='flex justify-center text-black pb-3'>
                    <div>Register a new account:</div>
                    <button onClick={handleCreateUser} className='pl-3 font-bold text-sm text-blue-500 hover:text-blue-800'>New</button>
                </div>
            </div>
        </div>
    )
}
