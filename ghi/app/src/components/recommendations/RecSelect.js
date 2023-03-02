import { useGetRecsQuery } from "../../store/queries/recApi";
import { useState } from "react";


export default function RecSelect(){
    const [type, setType] = useState('reds')
    const {data: wines} = useGetRecsQuery(type)
    const handleChange = () => {
        return
    }
    return(
        <div className="mt-10 pt-10">
           <select name="type" onChange={handleChange} defaultValue="reds">
                <option value="reds">Reds</option>
                <option value="whites">Whites</option>
                <option value="sparkling">Sparkling</option>
                <option value="dessert">Dessert</option>
                <option value="port">Port</option>
            </select>
        </div>
    )
}
