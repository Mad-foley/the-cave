import { useCreateUserMutation } from "../../store/queries/authApi"
import { useState } from "react"
import { useLogInMutation } from "../../store/queries/authApi"
import { useDispatch } from "react-redux";
import { setLogged } from "../../store/queries/modalSlice";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm() {
    const profilePics = [
        'https://img.freepik.com/free-vector/cute-cool-pizza-slice-wearing-glasses-cartoon-vector-icon-illustration-food-holiday-icon-isolated_138676-4808.jpg?w=2000',
        'https://cdn.dribbble.com/users/1787323/screenshots/9712559/media/53dfba9191d318106b7714b74fb9e3eb.png?compress=1&resize=400x300',
        'https://media.istockphoto.com/id/1300604627/vector/cute-grapes-logo-vector-illustration-design-with-eyes-and-mouth.jpg?s=170667a&w=0&k=20&c=lHaz067_5EHRcPsLJIn64fkOFvcbojOoZPNZb6zO_sg=',
        'https://i.pinimg.com/originals/98/e6/62/98e6629104c2f4a0cc27787998f4c4dc.jpg',
        'https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-31.jpg',
        'https://static.vecteezy.com/system/resources/previews/000/618/739/original/cute-little-kitten-vector.jpg',
        'https://image.chewy.com/is/image/catalog/265891_PT8._AC_SL1200_V1624337078_.jpg',
        'https://www.goodfreephotos.com/albums/vector-images/blue-robot-vector-art.png',
        'https://illustoon.com/photo/4797.png',
        'https://preview.redd.it/rbmmfzpa9pz71.png?auto=webp&s=df0d7627d81586f6ceb9d63aa971cb4359d8534c',
        'https://static.vecteezy.com/system/resources/previews/005/294/068/original/cute-red-panda-cartoon-icon-illustration-animal-flat-cartoon-style-free-vector.jpg',
        'https://thumbs.dreamstime.com/z/red-crowned-crane-icon-vector-illustration-cartoon-style-red-crowned-crane-icon-vector-illustration-cartoon-style-bird-isolated-148215539.jpg'
    ]
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        birthday: '',
        image_url: profilePics[Number.parseInt(Math.random() * profilePics.length)]
    })
    const [createUser] = useCreateUserMutation()
    const [login] = useLogInMutation()
    const dispatch = useDispatch()
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
                dispatch(setLogged(true))
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
                {
                    profilePics.map(pic => {
                        return(
                        <button className={pic === formData.image_url ? 'bg-blue-700 shadow-xl profile-img p-2' : 'p-2'} onClick={handleProfileButton} name='image_url' type='button' value={pic}>
                            <img src={pic} value={pic} style={{width:'50px', height:'50px'}} className="profile-img"/>
                        </button>
                    )
                })
                }
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
