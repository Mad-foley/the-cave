
import { useGetWineByIdQuery } from "../../store/queries/wineApi"
import wineSlice from "../../store/queries/wineSlice"
import { store } from "../../store/store"

export default function WineDetails() {
    const wineId = store.getState().wineId.wineId
    const {data: wine, isSuccess} = useGetWineByIdQuery(wineId)

    if (isSuccess)
        {
            return (
            <div>
                <div className="container relative mt-5 mx-10">
                    <div className="mb-3 text-2xl">{wine.name}</div>
                    <div className="ml-5 text-xl">{wine.varietal}</div>
                    <div className="ml-5 text-xl">{wine.vintage}</div>
                    <div className="ml-5 text-xl">{wine.winery}</div>
                    <div className="ml-5 text-xl">{wine.location}</div>
                    <div>
                        <img style={{width: "250px"}} className="absolute top-0 right-0" src={wine.image_url}/>
                    </div>
                </div>
                <div style={{width: "1000px", height: "500px"}} className="mt-9 ml-5 border">Comments</div>
            </div>
        )
    }
}
