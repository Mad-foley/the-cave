import { useGetRecsQuery } from "../../store/queries/recApi";
import { useState } from "react";
import RecCard from "./RecCard";
import CreateWineForm from "../wines/CreateWineModal";
import LoadingAnimation from "../common/LoadingAnimate";


export default function RecSelect(){
    const [type, setType] = useState('reds')
    const {data: wines, isSuccess} = useGetRecsQuery(type)
    const [loading, setLoading] = useState(false)
    const handleChange = (event) => {
        setLoading(false)
        setTimeout(() => {
            setLoading(true)
        }, '1700')
        setType(event.target.value)
    }
    if (isSuccess) {
        // let randomIdx1 = Math.floor(Math.random()*wines.length)
        let recommendations = []
        for (let i=0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random()*wines.length)
            recommendations.push(wines[randomIdx])
        }
        // console.log(recommendations)
        return(
            <div className="mt-10 pt-10 text-black" style={{marginLeft:'400px', marginRight:'400px'}}>
                <div className="relative mx-20 flex justify-end">
                    <div className="">
                        <div className="text-white">Select a type</div>
                        <select className=" p-1 rounded bg-wine text-white" name="type" onChange={handleChange} style={{filter:'brightness(70%)'}} value={type} >
                            <option value="reds">Reds</option>
                            <option value="whites">Whites</option>
                            <option value="sparkling">Sparkling</option>
                            <option value="dessert">Dessert</option>
                            <option value="port">Port</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                {!loading ?
                    <div className="mt-10 text-white">
                        <LoadingAnimation/>
                    </div>
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
                </div>
            </div>
        )
    }

}
