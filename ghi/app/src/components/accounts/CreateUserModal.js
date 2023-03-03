import { useCreateUserMutation } from "../../store/queries/authApi"
import { useState } from "react"
import { useLogInMutation } from "../../store/queries/authApi"
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/queries/modalSlice";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm() {
    const profileOption1 = 'https://www.freedomspromise.org/wp-content/uploads/2020/01/male-silluette.jpg'
    const profileOption2 = 'https://simg.nicepng.com/png/small/356-3568165_blank-profile-picture-female.png'
    const pizza = 'https://img.freepik.com/free-vector/cute-cool-pizza-slice-wearing-glasses-cartoon-vector-icon-illustration-food-holiday-icon-isolated_138676-4808.jpg?w=2000'
    const pizza2 = 'https://cdn.dribbble.com/users/1787323/screenshots/9712559/media/53dfba9191d318106b7714b74fb9e3eb.png?compress=1&resize=400x300'
    const grape = 'https://media.istockphoto.com/id/1300604627/vector/cute-grapes-logo-vector-illustration-design-with-eyes-and-mouth.jpg?s=170667a&w=0&k=20&c=lHaz067_5EHRcPsLJIn64fkOFvcbojOoZPNZb6zO_sg='
    const dog = 'https://i.pinimg.com/originals/98/e6/62/98e6629104c2f4a0cc27787998f4c4dc.jpg'
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        birthday: '',
        image_url: dog
    })
    const [createUser] = useCreateUserMutation()
    const [login] = useLogInMutation()
    const dispatch = useDispatch()
    const modalData = useSelector(state => state.modalWindow.modal)
    const navigation = useNavigate()


    const handleFormChange = (e) => {
        setFormData( {
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await createUser(formData)
        if (result.data){
            const log = await login({
                username: formData.username,
                password: formData.password
            })
            if(log.data) {
                dispatch(setModal({
                    ...modalData,
                    logged: true,
                }))
                navigation('/')
            }
        }
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
    const handleProfileButton = event => {
        setFormData({
            ...formData,
            [event.currentTarget.name]:event.currentTarget.value
        })
    }
    const inputClass = "shadow rounded w-full leading-tight py-2 px-3 text-gray-700 mb-3"
    return (
        <div className="container mx-auto grid grid-cols-5 p-5"
             style={{width: "800px"}}>
            <form
            onSubmit={handleSubmit}
            className="px-3 pt-6 pb-8 mb-4 col-span-3">
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
                <button className="p-2" onClick={handleProfileButton} name='image_url' type='button' value={profileOption1}>
                    <img src={profileOption1} value={profileOption1} style={{width:'50px', height:'50px'}} className="profile-img"/>
                </button>
                <button className='p-2' onClick={handleProfileButton} name='image_url' type='button' value={profileOption2}>
                    <img src={profileOption2} value={profileOption2} style={{width:'50px', height:'50px'}} className='profile-img'/>
                </button>
                <button className="p-2" onClick={handleProfileButton} name="image_url" type="button" value={pizza}>
                    <img src={pizza} className="profile-img" style={{width:'50px', height:'50px'}}/>
                </button>
                <button className="p-2" onClick={handleProfileButton} name="image_url" type="button" value={pizza2}>
                    <img src={pizza2} className="profile-img" style={{width:'50px', height:'50px'}}/>
                </button>
                <button className="p-2" onClick={handleProfileButton} name="image_url" type="button" value={grape}>
                    <img src={grape} className="profile-img" style={{width:'50px', height:'50px'}}/>
                </button>
                <button className="p-2" onClick={handleProfileButton} name="image_url" type="button" value={dog}>
                    <img src={dog} className="profile-img" style={{width:'50px', height:'50px'}}/>
                </button>
                <br></br>
                <button
                className="navbutton mt-2 font-bold text-sm py-2 px-4 rounded"
                >Submit</button>
            </form>
            <div className='pt-10 mt-10 pl-10 ml-10 col-span-2'>
                <img src={formData.image_url} style={{height:'200px', width:'200px'}} className='profile-img mt-5'/>
            </div>
        </div>
    )
}
