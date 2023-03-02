import { useGetUserByIdQuery } from "../../store/queries/authApi"
import { useNavigate } from "react-router-dom"
import { useGetLikesByUserQuery } from "../../store/queries/likesApi"
import {useGetWineByIdQuery} from "../../store/queries/wineApi"
import { useEffect, useState } from "react"
import WineCard from "../wines/WineCard"


export default function UserDetail() {
    const {data:likes, isSuccess} = useGetLikesByUserQuery()
    const navigate = useNavigate()
    const [wineId, setWineId] = useState()
    const { data: user, isLoading} = useGetUserByIdQuery()
    const {data:wine, isError} = useGetWineByIdQuery(wineId)
    const handleRecentWine = () => {
        if (isSuccess && likes.length) {
            setWineId(likes[likes.length - 1].wine_id)
        }
    }
    useEffect(()=>{
        handleRecentWine()
    },[isSuccess])

    const handleUpdate = (e) => {
        navigate("/account/update")
    }

    const handleList = (e) => {
        navigate("/account/likes")
    }
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {
            weekday:'long',
            year:'numeric',
            month:'long',
            day:'numeric'
        })
    }

    if(!isLoading && isSuccess && !isError){
        return(
            <div className="relative pl-20 pr-20 mt-10">
                <div className="relative p-10">
                    <div className="border p-5 rounded">
                        <div className="text-2xl text-center">
                            <span className="pr-1">Welcome back</span>
                            <span>{user.name}</span>
                        </div>
                        <div className="text-sm text-end mr-10 pr-10">@{user.username}</div>
                        <div className="flex justify-center pb-3">
                            <img
                                src={user.image_url}
                                className='profile-img mt-10'
                                style={{maxHeight:'300px', minHeight:'250px'}}
                            />
                        </div>
                    </div>
                    <div className="absolute top-11 right-11">
                        <button
                            onClick={handleUpdate}
                            className='likebutton p-1 rounded'
                            >Update
                        </button>
                    </div>
                </div>
                <div className="absolute top-10 left-7 text-end">
                    <button
                    onClick={handleList}
                    className='likebutton p-1 rounded'
                    >Your likes</button>
                    <div>
                        <button
                        className="likebutton p-1 rounded"
                        >Your Wines</button>
                    </div>
                </div>
                <div className="m-10">
                    <div className="text-center text-2xl pb-3">Your most recently liked wine</div>
                    {wine && wineId !== 2 ? <WineCard wine={wine}/> : <div className="text-center">You have not liked anything yet</div>}
                </div>
            </div>
        )
    }
}
