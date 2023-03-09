import WineCard from "../wines/WineCard"
import { useGetWineByUserQuery } from "../../store/queries/wineApi";
import { useGetUserByIdQuery } from "../../store/queries/authApi";
import WineCollapse from '../wines/WineCollapse'
import { useSelector } from "react-redux";


export default function UserWines() {
    const modalData = useSelector(state => state.modalWindow)
    const {data:user, isSuccess} = useGetUserByIdQuery()
    const {data:wines, isLoading} = useGetWineByUserQuery(user ? user.id : 1)
    if (isSuccess && !isLoading) {
        return (
                <div>
                    <div className="flex justify-center text-2xl pt-5">Your wines</div>
                    <div className="flex justify-center">0 - {wines.length}</div>
                    {wines.length === 0 &&
                    <div className="text-xl text-center">Add wines to the database to get started</div>
                        }
                    <div className="winepage grid justify-center">
                        <div>
                        {wines.map(wine => {
                            return (
                                <div className={modalData.expandWine.includes(wine.id) ? "winecard m-2" : "m-2 mb-5 winecard"} key={wine.id}>
                                    {modalData.expandWine.includes(wine.id)
                                    ? <WineCollapse wine={wine}/>
                                    : <WineCard wine={wine}/>
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
            <div className="flex justify-center pt-10">
                <div className="text-2xl">Log in to see details</div>
            </div>
        )
    }

}
