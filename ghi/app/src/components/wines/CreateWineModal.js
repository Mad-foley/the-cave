import { useCreateWineMutation } from "../../store/queries/wineApi";
import { useState } from "react";

export default function CreateWineForm() {
    const [formData, setFormData] = useState({})
    const [createWine] = useCreateWineMutation()

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
       const wine = await createWine(formData)
       console.log(wine.id)
    }


    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    return(
        <div className="container mx-auto flex justify-center p-5 text-center">
            <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                onChange={handleFormChange}
                name="name"
                placeholder='Name'
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="location"
                placeholder='Location'
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="varietal"
                placeholder="Varietal"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input
                onChange={handleFormChange}
                name="winery"
                placeholder="Winery"
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="image_url"
                placeholder="Profile picture URL"
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="vintage"
                placeholder="Vintage"
                className={inputClass}/>
                <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >Submit</button>
            </form>
        </div>
    )
}
