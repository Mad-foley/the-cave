import { useUpdateWineMutation } from "../../store/queries/wineApi";
import { useState, useEffect } from "react";
import { useGetWineByIdQuery } from "../../store/queries/wineApi";

export default function UpdateWineForm() {

    const {data: wine} = useGetWineByIdQuery(3)
    const wine_data = wine
    console.log(wine_data)
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        varietal: '',
        winery: '',
        image_url: '',
        vintage: ''
    })
    const [updateWine] = useUpdateWineMutation()




    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formData)
        updateWine(formData, wine_data.id)
    }


    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    if(wine){
    return(
        <div className="container mx-auto flex justify-center p-5 text-center">
            <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                onChange={handleFormChange}
                name="name"
                defaultValue={wine.name}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="location"
                defaultValue={wine.location}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="varietal"
                defaultValue={wine.varietal}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input
                onChange={handleFormChange}
                name="winery"
                defaultValue={wine.winery}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="image_url"
                defaultValue={wine.image_url}
                className={inputClass}/>
                <input
                onChange={handleFormChange}
                name="vintage"
                defaultValue={wine.vintage}
                className={inputClass}/>
                <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >Update</button>
            </form>
        </div>
    )
    }
}
