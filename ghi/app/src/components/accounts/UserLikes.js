import WineCard from "../wines/WineCard"
import { useGetFavoriteQuery } from "../../store/queries/wineApi"


export default function UserLikes () {
    const {data:favorites, isSuccess} = useGetFavoriteQuery()
    if (isSuccess && favorites.length) {
        return (
            <div>
                <div className="text-center">0 - {favorites.length}</div>
                <div className="grid justify-center winepage">
                    {favorites.map(wine => {
                        return (
                        <div className="winecard m-5" key={wine.id}>
                            <WineCard wine={wine} />
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className="text-2xl text-center p-10">You do have any likes</div>
            </div>
        )
    }
}
