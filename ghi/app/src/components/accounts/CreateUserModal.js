import { useCreateUserMutation } from "../../store/queries/authApi"
import { useState } from "react"
import { useLogInMutation } from "../../store/queries/authApi"


export default function CreateUserForm() {
    const profileOption1 = 'https://www.freedomspromise.org/wp-content/uploads/2020/01/male-silluette.jpg'
    const profileOption2 = 'https://simg.nicepng.com/png/small/356-3568165_blank-profile-picture-female.png'
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        birthday: '',
        image_url: ''
    })
    const [createUser] = useCreateUserMutation()

    const handleFormChange = (e) => {
        setFormData( {
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(formData)
        setFormData(
            {
                name: '',
                username: '',
                password: '',
                birthday: '',
                image_url: ''
            }
        )
    }
    const inputClass = "shadow rounded w-full leading-tight py-2 px-3 text-gray-700 mb-3"
    return (
        <div className="container mx-auto flex justify-center p-5 text-center"
             style={{width: "800px"}}>
            <form
            onSubmit={handleSubmit}
            className="mx-9 px-8 pt-6 pb-8 mb-4">
                <div className="pb-10 font-bold text-2xl">Create a new account</div>
                <input
                onChange={handleFormChange}
                name="name"
                placeholder='Full name'
                value={formData.name}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="username"
                placeholder='Username'
                value={formData.username}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                type="date"
                name="birthday"
                value={formData.birthday}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="image_url"
                placeholder="Profile picture URL"
                value={formData.image_url}
                className={inputClass}/>
                <button className="p-2" onClick={handleFormChange} name='image_url' type='button' value={profileOption1}>option 1</button>
                <button className='p-2' onClick={handleFormChange} name='image_url' type='button' value={profileOption2}>option 2</button>
                <br></br>
                <button
                className="navbutton mt-2 font-bold text-sm py-2 px-4 rounded"
                >Submit</button>
            </form>
            <div style={{width:'400px', height:'400px'}} className='pt-10 mt-10'>
                <img src={formData.image_url} className='profile-img mt-5'/>
            </div>
        </div>
    )
}
