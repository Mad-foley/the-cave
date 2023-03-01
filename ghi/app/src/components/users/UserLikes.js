import { useGetLikesByUserQuery } from "../../store/queries/likesApi"
import { useGetWinesQuery } from "../../store/queries/wineApi"
import WineCard from "../wines/WineCard"


export default function UserLikes () {
    const { data: likes, isLoading} = useGetLikesByUserQuery()
    const { data: wines, isSuccess } = useGetWinesQuery()

    if(!isLoading){
        const likedWines = []

        if(isSuccess){
            for (let like of likes) {
                for(let wine of wines){
                    if(like.wine_id === wine.id){
                        likedWines.push(wine)
                        break
                    }
                }
            }
            console.log(likedWines)
        }



        return (
        <div>
            {likedWines.map(wine => {
                return (
                <div className="winecard m-5" >
                    <WineCard wine={wine} />
                </div>
                )
            })}

        </div>
    )
    }


}
