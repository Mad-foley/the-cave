import plusSymbolWine from "../../utilities/png/plusSymbolWine.png"
import { useDispatch } from "react-redux"
import { setWine } from "../../store/queries/wineSlice"
import { useNavigate } from "react-router-dom"
import { winePreview } from "../../utilities/constants"


export default function RecCard({wine}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAddButton = async () => {
        const formData = {
            name: wine.name,
            location: wine.location + ', ' + wine.region,
            varietal: wine.type,
            winery: wine.winery,
            image_url: wine.image,
            vintage: wine.vintage
        }
        dispatch(setWine(formData))
        navigate('/wines/create')
    }

    return (
        <div className='wine-body flex justify-between bg-white text-black rounded relative dark:bg-black dark:text-white' style={{height:'300px', width:'600px'}}>
            <div className="border p-3 m-3 relative" style={{width:'500px'}}>
                <div className = "text-center">
                    <div className='text-xl font-bold border-b'>{wine.name}</div>
                    <div>{wine.vintage}</div>
                </div>
                <div className="pl-1 text-start">
                    <br></br>
                    <div>{wine.type}</div>
                    <div>{wine.location}</div>
                    <div>{wine.winery}</div>
                </div>
            </div>
            <div className = "relative" style={{width:'200px'}}>
                <img
                src={wine.image}
                onError={(e)=>{e.currentTarget.src = winePreview}}
                className='absolute bottom-0 p-1'
                style={{maxHeight:'300px', minHeight:'250px'}}
                />
            </div>
            <div className="p-2">
                <button className="plusButton" onClick={handleAddButton}>
                    <img src={plusSymbolWine} style={{width:'50px'}}/>
                </button>
            </div>
        </div>
    )

}
