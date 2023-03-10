import { useGetUserByIdQuery } from "../../store/queries/authApi"
import { useNavigate } from "react-router-dom"
import { useGetLikesByUserQuery } from "../../store/queries/likesApi"
import {useGetWineByIdQuery} from "../../store/queries/wineApi"
import { useEffect, useState } from "react"
import WineCard from "../wines/WineCard"
import LogsFeed from "./LogsFeedModal"
import { setBlur, setDeleteUserWindow } from "../../store/queries/modalSlice"
import { useDispatch } from "react-redux"
import { useCallback } from "react"


export default function UserDetail() {
    const {data:likes, isSuccess} = useGetLikesByUserQuery()
    const navigate = useNavigate()
    const [wineId, setWineId] = useState(2)
    const { data: user, isLoading} = useGetUserByIdQuery()
    const {data:wine, isError} = useGetWineByIdQuery(wineId)
    const dispatch = useDispatch()
    const handleRecentWine = useCallback(() => {
        if (isSuccess && likes.length) {
            setWineId(likes[likes.length - 1].wine_id)
        }
    }, [isSuccess, likes, setWineId])
    useEffect(()=>{
        handleRecentWine()
    },[isSuccess, likes, setWineId, handleRecentWine])
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

    const handleDelete = () => {
        dispatch(setBlur(true))
        dispatch(setDeleteUserWindow(true))
    }

    const handleLikesButton = () => {
        navigate('/account/wines')
    }

    if(!isLoading && isSuccess && !isError){
        return(
            <div className="relative pl-20 pr-20 mt-10">
                <div className="border dark:bg-[#453f3f] grid grid-cols-2 rounded-xl shadow-xl pr-10" id="user-card">
                    <div className="relative pt-10 pb-5 pl-20 pr-3">
                        <div className="border p-5 rounded-xl shadow-xl dark:bg-[#595454]">
                            <div className="text-2xl text-center pt-3">
                                <span className="pr-1">Welcome back</span>
                                <span>{user.name}</span>
                            </div>
                            <div className="text-sm text-end mr-10 pr-10" id="anchor">@{user.username}</div>
                            <div className="flex justify-center pb-3">
                                <img
                                    alt=''
                                    src={user.image_url}
                                    className='profile-img mt-10'
                                    style={{maxHeight:'300px', minHeight:'250px'}}
                                />
                            </div>
                        </div>
                        <div className="text-center">Member since {formatDate(user.created_on)}</div>
                        <div className="absolute top-11 right-4">
                            <button
                                onClick={handleUpdate}
                                className='likebutton p-1 rounded'
                                >edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className='likebutton p-1 rounded'
                            >delete</button>
                        </div>
                    </div>
                    <div className="pr-5 pb-3">
                        <div className="text-center text-2xl pb-1 pt-5">Your Logs</div>
                        <div className="relative pl-5 winepage shadow-xl rounded-xl border p-5 m-2 shadow-xl dark:bg-[#595454]" style={{height:'80%', width:'105%'}}>
                            <div className="absolute w-full pr-10">
                                <LogsFeed />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-10 left-7 text-end">
                    <button
                    onClick={handleList}
                    className='userbutton p-1 rounded border'
                    >Your likes</button>
                    <div className="pt-3">
                        <button
                        onClick={handleLikesButton}
                        className="userbutton p-1 rounded border"
                        >Your Wines</button>
                    </div>
                </div>
                <div className="pt-11"></div>
                <div className="m-10 pt-20 pb-20">
                    <div className="text-center text-2xl pb-3">Your most recently liked wine</div>
                    <div className="flex justify-center relative" id="recent-like">
                        <div className="absolute bg-transparent z-10" style={{width:'100%',height:'100%'}}></div>
                        {wine ? <WineCard wine={wine}/> : <div className="text-center">You have not liked anything yet</div>}
                    </div>
                </div>
                <div className="flex justify-center p-10 pt-20">Many grapes were harmed in the production</div>
            </div>
        )
    }
}
