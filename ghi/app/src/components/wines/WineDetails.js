import { useGetUsersQuery } from "../../store/queries/authApi"
import { useGetWineByIdQuery } from "../../store/queries/wineApi"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLikesByWinesQuery } from "../../store/queries/likesApi"
import { useGetTokenQuery } from "../../store/queries/authApi"


export default function WineDetails() {
    let {id} = useParams()
    const navigate = useNavigate()
    const {data: wine, isSuccess} = useGetWineByIdQuery(id)
    const {data: users, isLoading} = useGetUsersQuery()
    const {data: likes, isError} = useGetLikesByWinesQuery(id)
    const {data: token} = useGetTokenQuery()
    const creator = (id) => {
        for (let user of users) {
            if (user.id === id) {
            return user
            }
        }

    }
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {
            weekday:'long',
            year:'numeric',
            month:'short',
            day:'numeric'
        })
    }
    if (isSuccess && !isLoading && likes && token) {
        return (
            <div className="pl-10 ml-10 pt-5">
                <div className="flex mt-5 mx-10 px-10 h-full relative">
                    <div style={{width:'950px'}} className='relative'>
                        <div className="flex justify-between border-b-2 text-2xl pl-6 pr-5 pb-2">
                            <div>{wine.name}</div>
                            <div>{wine.vintage}</div>
                        </div>
                        <div className="pt-10 pl-10 grid grid-cols-2">
                            <div className="">
                                <div className="ml-5 text-xl pb-1">{wine.varietal}</div>
                                <div className="ml-5 text-xl pb-1">{wine.winery}</div>
                                <div className="ml-5 text-xl">{wine.location}</div>
                            </div>
                            <div className="text-end">
                                <div className="text-sm">created on</div>
                                <div className="pr-3">{formatDate(wine.created_on)}</div>
                                <div className="text-sm">modified on</div>
                                <div className="pr-3">{formatDate(wine.modified_on)}</div>
                                <br></br>
                                <div className="text-sm">Created by</div>
                                <div className="pr-3 text-xl">{creator(wine.created_by).name}</div>
                            </div>
                        </div>
                        <div className="pl-3 absolute ">
                            <span>liked by</span>
                            <span className="pl-1 text-xl font-bold">{likes.length}</span>
                        </div>
                    </div>
                    <div className="pl-10 pt-10 relative" style={{width:'320px'}}>
                        <div className="bg-white rounded-xl px-10 py-3">
                            <img className="rounded-xl" src={wine.image_url}/>
                        </div>
                        <div className="absolute top-0 right-0">
                            <button onClick={()=>{navigate(`/wines/update/${wine.id}`)}} className="navbutton rounded p-1">Edit</button>
                            <button className="navbutton rounded p-1">Delete</button>
                        </div>
                    </div>
                    <div style={{width: "950px", height: "390px"}} className="absolute border bottom-0 p-3 rounded-xl">Comments</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex justify-center pt-10">
                <div style={{fontSize:'100px'}}>Log in to see details</div>
            </div>
        )
    }
}
