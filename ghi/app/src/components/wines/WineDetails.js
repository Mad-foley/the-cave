import { useGetUsersQuery } from "../../store/queries/authApi"
import { useGetWineByIdQuery } from "../../store/queries/wineApi"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLikesByWinesQuery } from "../../store/queries/likesApi"
import { useGetTokenQuery } from "../../store/queries/authApi"
import CreateComment from "../comments/CreateCommentModal"
import CommentModal from "../comments/Comments"


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
                <div className="grid grid-cols-5 mt-5 mx-10 pl-10 h-full">
                    <div className="col-span-3 pl-10">
                        <div style={{width:'950px'}} className="flex justify-between border-b-2 text-2xl pl-6 pr-5 pb-2 mb-5">
                            <div>{wine.name}</div>
                            <div>{wine.vintage}</div>
                        </div>
                        <div className="pt-10 pl-10 grid grid-cols-3 border p-8 rounded-xl">
                            <div className="col-span-2">
                                <div className="border p-2 rounded" style={{width:'300px'}}>
                                    <div>Varietal</div>
                                    <div className="ml-5 text-xl pb-1">{wine.varietal}</div>
                                </div>
                                <div className="border p-2 mt-2" style={{width:'300px'}}>
                                    <div>Winery</div>
                                    <div className="ml-5 text-xl pb-1">{wine.winery}</div>
                                </div>
                                <div className="border mt-2 rounded p-2" style={{width:'300px'}}>
                                    <div>Appellation</div>
                                    <div className="ml-5 text-xl">{wine.location}</div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="border p-2 border rounded">
                                   <div className="text-sm">created on</div>
                                   <div className="pl-3">{formatDate(wine.created_on)}</div>
                                </div>
                                <div className="border p-2 rounded mt-2">
                                    <div className="text-sm">modified on</div>
                                    <div className="pl-3">{formatDate(wine.modified_on)}</div>
                                </div>
                                <br></br>
                                <div className="text-sm">Created by</div>
                                <div className="ml-5 pr-3 text-xl">{creator(wine.created_by).name}</div>
                            </div>
                        </div>
                        <div className="pl-3">
                            <span>liked by</span>
                            <span className="pl-1 text-xl font-bold">{likes.length}</span>
                        </div>
                    </div>
                    <div className="pl-10 pt-10 relative col-span-1">
                        <div className="bg-white rounded-xl py-3 grid justify-center">
                            <img style={{width: "270px"}} className="rounded-xl" src={wine.image_url}/>
                        </div>
                        {token.user.id === wine.created_by &&
                        <div className="absolute top-0 right-0">
                            <button onClick={()=>{navigate(`/wines/update/${wine.id}`)}} className="navbutton rounded p-1">Edit</button>
                            <button className="navbutton rounded p-1">Delete</button>
                        </div>}
                    </div>
                    <div style={{width: "1090px", height: "400px"}} className="absolute mt-9 ml-10 border bottom-10 p-3 rounded-xl">
                        <div>
                            <CreateComment wine_id={wine.id}/>
                            <div className="relative pl-5 winepage rounded" style={{height:'330px'}}>
                                <div className="absolute">
                                    <CommentModal wine_id={wine.id}/>
                                </div>
                            </div>
                        </div>
                    </div>
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
