import { useUpdateWineMutation } from "../../store/queries/wineApi";
import { useState } from "react";
import { useGetWineByIdQuery } from "../../store/queries/wineApi";
import { useParams } from "react-router-dom";
import WineCard from "./WineCard";
import { quotes } from "../../utilities/constants";
import { useNavigate } from "react-router-dom"


export default function UpdateWineForm() {
    const navigate = useNavigate()
    let randomNumber = Math.floor(Math.random()*quotes.length)
    const {id} = useParams()
    const {data: wine, isSuccess} = useGetWineByIdQuery(id)
    const [formData, setFormData] = useState({
        id: '',
        form: {
            name: '',
            location: '',
            varietal: '',
            winery: '',
            image_url: '',
            vintage: ''
        }
    })
    const [updateWine] = useUpdateWineMutation()
    const [previewData, setPreviewData] = useState({
        name: 'Untitled',
        location: 'Somewhere',
        varietal: 'Wine juice',
        winery: 'Winery',
        image_url: 'https://cdn-icons-png.flaticon.com/512/763/763072.png',
        vintage: '2000',
        created_by: id,
        created_on: '12-30-1999',
        modified_on: '12-25-2000',
        id: 2
    })
    const handleFormChange = (e) => {
        setFormData({
            id:id,
            form: {
                ...formData.form,
                [e.target.name]: e.target.value
            }
        })
        setPreviewData({
            ...previewData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        for (const [k, v] of Object.entries(formData.form)){
            if (v === "") {
                formData.form[k] = wine[k]
            }
        }
        const result = await updateWine(formData)
        if (result.data) {
            navigate(`/wines/details/${result.data.id}`)
        }
    }

    const inputClass = "rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    if(isSuccess){
        return(
            <div>
                <div className="container mx-auto flex justify-center p-5 text-center">
                    <form
                    onSubmit={handleSubmit}
                    className="px-8 pt-6 pb-8 mb-4">
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
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="winery"
                        defaultValue={wine.winery}
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="image_url"
                        placeholder="Picture URL"
                        defaultValue={wine.image_url}
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="vintage"
                        defaultValue={wine.vintage}
                        className={inputClass}/>
                        <button
                        className="navbutton rounded-xl m-3 p-1"
                        >Update</button>
                    </form>
                    <div className="container p-8 relative">
                        <div className="absolute bg-transparent z-10" style={{height:'100%', width:"100%"}}></div>
                        <WineCard wine={previewData}/>
                    </div>
                </div>
                <div className="text-center" style={{fontSize:'30px'}}>{quotes[randomNumber].quote}</div>
                <div className="text-center">{quotes[randomNumber].author}</div>
            </div>
        )
    }
}
