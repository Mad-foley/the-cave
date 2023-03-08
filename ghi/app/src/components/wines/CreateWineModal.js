import { useCreateWineMutation } from "../../store/queries/wineApi";
import { useState } from "react";
import WineCard from "./WineCard";
import { quotes } from "../../utilities/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWine } from "../../store/queries/wineSlice"
import {logsApi} from "../../store/queries/logsApi"
import { winePreview } from "../../utilities/constants";


export default function CreateWineForm() {
    const dispatch = useDispatch()
    const data = useSelector(state => state.wineRec.wine)
    const today = new Date()
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState(false)
    const [formData, setFormData] = useState({
        name:data.name,
        location:data.location,
        varietal:data.varietal,
        winery:data.winery,
        image_url:data.image_url,
        vintage:data.vintage
    })
    const [previewData, setPreviewData] = useState({
        name:data.name || 'Untitled',
        location:data.location || 'Somewhere',
        varietal:data.varietal || 'Grape Juice',
        winery:data.winery || 'Grape Vineyards',
        image_url:data.image_url || winePreview,
        vintage:data.vintage || '2000',
        created_on:'12-30-1999',
        modified_on:'12-25-2000',
        created_by:0,
        id:2
    })
    const [createWine] = useCreateWineMutation()
    let randomNumber = Math.floor(Math.random()*quotes.length)
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setPreviewData({
            ...previewData,
            'created_on':today,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const wine = await createWine(formData)
        dispatch(logsApi.util.invalidateTags(['Logs']))
        if (!wine.data.message) {
            const initialState = {
                name: '',
                location: '',
                varietal: '',
                winery: '',
                image_url: '',
                vintage: ''
            }

            dispatch(setWine(initialState))
            navigate(`/wines/details/${wine.data.id}`)
       }

       else {setErrorMsg(true)}
    }

    const inputClass = "wine-form mb-3 rounded w-full py-2 px-3 text-gray-700"
    if (data) {
        return(
            <div className="create-wine">
                <div className="lg:grid lg:grid-cols-2 md:flex md:flex-wrap">
                    <div className="container mx-auto flex justify-center p-5" style={{width:'650px', height:'480px'}}>
                        <form
                        onSubmit={handleSubmit}
                        className="relative rounded px-8 pt-6 pb-8 mb-4 form-root">
                            <h1 className="wine-form text-white font-bold text-xl pb-5">REGISTER</h1>
                            <input
                            onChange={handleFormChange}
                            name="name"
                            placeholder='Name'
                            defaultValue={data.name}
                            required
                            className={inputClass}/>
                            <input
                            onChange={handleFormChange}
                            name="location"
                            placeholder='Location'
                            defaultValue={data.location}
                            required
                            className={inputClass}/>
                            <input
                            onChange={handleFormChange}
                            name="varietal"
                            placeholder="Varietal"
                            defaultValue={data.varietal}
                            required
                            className={inputClass}/>
                            <input
                            onChange={handleFormChange}
                            name="winery"
                            defaultValue={data.winery}
                            placeholder="Winery"
                            required
                            className={inputClass}/>
                            <input
                            onChange={handleFormChange}
                            name="image_url"
                            defaultValue={data.image_url}
                            placeholder="Picture URL"
                            className={inputClass}/>
                            <input
                            onChange={handleFormChange}
                            name="vintage"
                            type='number'
                            defaultValue={data.vintage}
                            placeholder="Vintage"
                            required
                            className={inputClass}/>
                            <button
                            className="wine-form absolute right-5 bottom-1 font-bold text-sm p-3 rounded-xl navbutton"
                            >Submit</button>
                            {errorMsg && <div className="text-center">Something went wrong, try again</div>}
                        </form>
                    </div>
                    <div className="relative preview container mx-auto p-5">
                        <div className="pb-5 pt-5 font-bold text-xl">PREVIEW</div>
                        <div className="absolute z-10 bg-transparent w-full h-full"></div>
                        <WineCard wine={previewData}/>
                    </div>
                </div>
                <div className="quote text-center mx-10">
                    <div className="flex justify-center" style={{fontSize:'50px'}}>{quotes[randomNumber].quote}</div>
                    <div className="flex justify-center">{quotes[randomNumber].author}</div>
                </div>
            </div>
        )
    }
}
