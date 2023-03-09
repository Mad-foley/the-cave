import WineCard from "../wines/WineCard"
import { useGetFavoriteQuery } from "../../store/queries/wineApi"
import WineCollapse from "../wines/WineCollapse"
import {useSelector} from 'react-redux'


export default function UserLikes () {
    const modalData = useSelector(state => state.modalWindow)
    const {data:favorites, isSuccess} = useGetFavoriteQuery()
    if (isSuccess && favorites.length) {
        return (
            <div>
                <div className="text-center text-2xl pt-10">Your favorite wines</div>
                <div className="text-center">0 - {favorites.length}</div>
                <div className="grid justify-center winepage">
                    <div>
                    {favorites.map(wine => {
                        return (
                        <div className={modalData.expandWine.includes(wine.id) ? "winecard m-2" : "winecard m-2 mb-5"} key={wine.id}>
                            {modalData.expandWine.includes(wine.id)
                            ? <WineCollapse wine={wine}/>
                            : <WineCard wine={wine} />
                        }
                        </div>
                        )
                    })}
                    </div>
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
