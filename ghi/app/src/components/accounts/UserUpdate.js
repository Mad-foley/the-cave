import { useState } from "react";
import { useGetUserByIdQuery } from "../../store/queries/authApi";
import { useUpdateUserMutation } from "../../store/queries/authApi";
import { useNavigate } from "react-router-dom"


export default function UserUpdate() {
    const navigate = useNavigate()
    const { data: user, isLoading} = useGetUserByIdQuery()
    const initialForm = {
        name: '',
        birthday: '',
        image_url: '',
        username: '',
        password: '',
    }
    const[formData, setFormData] = useState(initialForm)
    const [updateUser] = useUpdateUserMutation()

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        for (const [k, v] of Object.entries(formData)){
            if (v === "") {
                formData[k] = user[k]
            }
        }
        const result = await updateUser(formData)
        if (result.data) {
            setFormData(initialForm)
            navigate('/account')
        }
    }
    const inputClass = "w-full rounded my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    if(!isLoading) {
        return (
            <div className="container mx-auto flex justify-center p-5 text-center">
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl pb-3">Update your information</h1>
                <input
                onChange={handleFormChange}
                name="name"
                defaultValue={user.name}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="birthday"
                type="date"
                defaultValue={user.birthday}
                className={inputClass}/>
                <input
                required
                onChange={handleFormChange}
                name="username"
                defaultValue={user.username}
                className={inputClass}/>
                <input
                required
                onChange={handleFormChange}
                name="password"
                type="password"
                placeholder="password"
                defaultValue={user.password}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="image_url"
                defaultValue={user.image_url}
                className={inputClass}/>
                <button
                className="likebutton p-2 rounded"
                >Update</button>
            </form>
        </div>
    )}
}
