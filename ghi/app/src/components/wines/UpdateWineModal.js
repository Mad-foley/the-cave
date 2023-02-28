import { useUpdateWineMutation } from "../../store/queries/wineApi";
import { useState, useEffect } from "react";
import { useGetWineByIdQuery } from "../../store/queries/wineApi";
import { useParams } from "react-router-dom";

export default function UpdateWineForm() {
    const {id} = useParams()
    const {data: wine, isSuccess} = useGetWineByIdQuery(id)
    const [formData, setFormData] = useState({
        form :{
            name: '',
            location: '',
            varietal: '',
            winery: '',
            image_url: '',
            vintage: ''
        }
    })
    const [updateWine] = useUpdateWineMutation()

    const handleFormChange = (e) => {
        setFormData({
            form: {
                ...formData.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(formData)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        for (const [k, v] of Object.entries(formData.form)){
            if (v === "") {
                formData.form[k] = wine[k]
            }
        }
        const result = await updateWine(formData)
        console.log(result)
    }

    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    if(isSuccess){
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
