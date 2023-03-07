import { useGetRecsQuery } from "../../store/queries/recApi";
import { useState } from "react";
import RecCard from "./RecCard";
import LoadingAnimation from "../common/LoadingAnimate";


export default function RecSelect(){
    const [type, setType] = useState('reds')
    const {data: wines, isSuccess} = useGetRecsQuery(type)
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const handleChange = (event) => {
        setSelected(true)
        setLoading(false)
        setTimeout(() => {
            setLoading(true)
        }, '1700')
        setType(event.target.value)
    }
    if (isSuccess) {
        let recommendations = []
        let indices = []
        for (let i=0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random()*wines.length)
            while (indices.includes(randomIdx)) {
                randomIdx = Math.floor(Math.random()*wines.length)
            }
            indices.push(randomIdx)
            recommendations.push(wines[randomIdx])
        }
        return(
            <div className="mt-10 pt-10 text-black" style={{marginLeft:'400px', marginRight:'400px'}}>
                <div className="relative mx-20 flex justify-end">
                    <div className="">
                        <div className="text-white">Select a type</div>
                        <select className=" p-1 rounded bg-wine light:text-white dark:text-black" onChange={handleChange} name="type" style={{filter:'brightness(70%)'}}>
                            <option defaultValue>{type === 'reds' ? 'Choose a type' : type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            <option value="reds">Reds</option>
                            <option value="whites">Whites</option>
                            <option value="sparkling">Sparkling</option>
                            <option value="dessert">Dessert</option>
                            <option value="port">Port</option>
                        </select>
                    </div>
                </div>
                {selected ? <div className="flex justify-center">
                {!loading ?
                    <div className="mt-10 text-white"><LoadingAnimation/></div>
                    :
                    <div className="recommendation-load">
                        {recommendations.map(wine =>{
                            return (
                                <div className="recommendation-load p-4" key={wine.id}>
                                    <RecCard wine={wine}/>
                                </div>
                            )
                        })}
                    </div>}
                </div> :
                <div className="text-white" style={{fontSize:'50px'}}>Select a type to get started</div>}
            </div>
        )
    }

}
