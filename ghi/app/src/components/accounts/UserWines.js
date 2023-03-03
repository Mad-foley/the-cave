import WineCard from "../wines/WineCard"
import { useGetWineByUserQuery } from "../../store/queries/wineApi";
import { useGetUserByIdQuery } from "../../store/queries/authApi";

export default function UserWines() {
    const {data:user, isSuccess} = useGetUserByIdQuery()
    const {data:wines, isLoading} = useGetWineByUserQuery(user ? user.id : 1)
    if (isSuccess && !isLoading) {
        return (
                <div>
                    <div className="flex justify-center text-2xl">Your wines</div>
                    <div className="flex justify-center">0 - {wines.length}</div>
                    <div className="winepage grid justify-center">
                        {wines.map(wine => {
                            return (
                                <div className="m-5 winecard" key={wine.id}>
                                    <WineCard wine={wine}/>
                                </div>
                            )
                        })}
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
