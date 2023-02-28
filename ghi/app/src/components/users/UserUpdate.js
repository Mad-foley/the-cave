import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../../store/queries/authApi";
import { useUpdateUserMutation } from "../../store/queries/authApi";

export default function UserUpdate() {
    const { data: user, isLoading} = useGetUserByIdQuery()
    const[formData, setFormData] = useState({
        name: '',
        birthday: '',
        image_url: '',
        username: '',
        password: '',

    })
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
        console.log(result)
    }



    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    if(!isLoading) {
    return (
        <div className="container mx-auto flex justify-center p-5 text-center">
        <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            onChange={handleFormChange}
            name="username"
            defaultValue={user.username}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <input
            onChange={handleFormChange}
            name="password"
            type="password"
            defaultValue={user.password}
            className={inputClass}/>
            <input
            onChange={handleFormChange}
            name="image_url"
            defaultValue={user.image_url}
            className={inputClass}/>
            <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >Update</button>
        </form>
    </div>
    )}
}
