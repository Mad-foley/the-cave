import { useGetTokenQuery } from "../../store/queries/authApi"
import { useGetLikesByUserQuery } from "../../store/queries/likesApi"
import { useGetWinesQuery } from "../../store/queries/wineApi"
import WineCard from "../wines/WineCard"


export default function UserLikes () {
    const { data: likes, isLoading} = useGetLikesByUserQuery()
    const { data: wines, isSuccess } = useGetWinesQuery()
    const {data:token} = useGetTokenQuery()
    if(!isLoading && isSuccess && token){
        const likedWines = []
        for (let like of likes) {
            for(let wine of wines){
                if(like.wine_id === wine.id){
                    likedWines.push(wine)
                    break
                }
            }
        }
    if (token) {
        return (
            <div>
                {likedWines.map(wine => {
                    return (
                    <div className="winecard m-5" key={wine.id}>
                        <WineCard wine={wine} />
                    </div>
                    )
                })}
            </div>
        )
        }
    }
    else {
        return (
            <div>
                <div className="text-2xl text-center p-10">You are not logged in</div>
            </div>
        )
    }
}
