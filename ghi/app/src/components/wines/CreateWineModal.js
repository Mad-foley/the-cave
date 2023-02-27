import { useCreateWineMutation } from "../../store/queries/wineApi";
import { useState } from "react";
import WineCard from "./WineCard";

export default function CreateWineForm() {
    const today = new Date()
    const quotes = [
        {
            quote:'“Life is too short to drink bad wine.”',
            author:'Anonymous'
        },
        {
            quote: '“My only regret in life is that I didn’t drink more wine.”',
            author: 'Ernest Hemingway'
        },
        {
            quote: '“I cook with wine. Sometimes I even add it to the food.”',
            author: 'W.C. Fields'
        },
        {
            quote: '“Champagne is appropriate for breakfast, lunch, or dinner.”',
            author: 'Madeline Puckette'
        }
    ]
    const [formData, setFormData] = useState({
        name:'',
        location:'',
        varietal:'',
        winery:'',
        image_url:'',
        vintage:''
    })
    const [previewData, setPreviewData] = useState({
        name:'Untitled',
        location:'location',
        varietal:'varietal',
        winery:'winery name',
        image_url:'https://cdn-icons-png.flaticon.com/512/763/763072.png',
        vintage:'year',
        created_on:'12-30-1999',
        modified_on:'12-25-2000',
        created_by:0,
        id:0
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
            ['created_on']:today,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
       const wine = await createWine(formData)
       console.log(wine.id)
    }

    const inputClass = "wine-form mb-3 rounded w-full py-2 px-3 text-gray-700"
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
                        required
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="location"
                        placeholder='Location'
                        required
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="varietal"
                        placeholder="Varietal"
                        required
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="winery"
                        placeholder="Winery"
                        required
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="image_url"
                        placeholder="Picture URL"
                        className={inputClass}/>
                        <input
                        onChange={handleFormChange}
                        name="vintage"
                        type='number'
                        placeholder="Vintage"
                        required
                        className={inputClass}/>
                        <button
                        className="wine-form absolute right-5 bottom-1 font-bold text-sm p-3 rounded-xl navbutton"
                        >Submit</button>
                    </form>
                </div>
                <div className="preview container mx-auto p-5">
                    <div className="pb-5 pt-5 font-bold text-xl">PREVIEW</div>
                    <WineCard wine={previewData}/>
                </div>
            </div>
            <div className="quote">
                <div className="flex justify-center" style={{fontSize:'50px'}}>{quotes[randomNumber].quote}</div>
                <div className="flex justify-center">{quotes[randomNumber].author}</div>
            </div>

        </div>
    )
}
