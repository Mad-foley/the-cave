import { useCreateLikeMutation, useDeleteLikeMutation, useGetLikesByUserQuery, useGetLikesByWinesQuery } from "../../store/queries/likesApi"
import { useGetTokenQuery } from "../../store/queries/authApi"
import { isRouteErrorResponse } from "react-router-dom"

export default function WineDetails({wine}) {
    const [like] = useCreateLikeMutation()
    const [unlike] = useDeleteLikeMutation()
    const {data: likes, isLoading} = useGetLikesByWinesQuery(wine.id)
    const {data: token} = useGetTokenQuery()


    const handleLike = async (e) => {
        e.preventDefault()
        if (likes.length > 0) {
            let liked = false
            for (let item of likes) {
                if (item.user_id === token.user.id){
                    liked = true
                }
            }
            if (!liked) {
                const results = await like(wine.id)
                console.log(results)
            }
            else if (liked) {
                const results = await unlike(wine.id)
                console.log(results)
            }
        }
        else {
            const result = await like(wine.id)
            console.log(result)
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
    if (!isLoading)
        {
            return (
            <div
            className='wine-body flex justify-between bg-white text-black rounded relative'
            style={{height:'300px', width:'600px'}}
            >
                <div className="border p-3 m-3 relative" style={{width:'500px'}}>
                    <div className = "text-center">
                        <div className='text-xl font-bold border-b'>{wine.name}</div>
                        <div>{wine.vintage}</div>
                    </div>
                    <div className="pl-1">
                        <br></br>
                        <div>{wine.varietal}</div>
                        <div>{wine.location}</div>

                        <div>{wine.winery}</div>
                    </div>
                    <div className="absolute bottom-1">added: {formatDate(wine.created_on)}</div>
                </div>
                <div className = "relative mr-10" style={{width:'200px'}}>
                    <img
                    src={wine.image_url}
                    className='absolute bottom-0 p-1'
                    style={{maxHeight:'300px', minHeight:'250px'}}
                    />
                </div>
                <button
                onClick={handleLike}
                className='absolute right-1 top-1 likebutton p-3 font-semibold py-2 rounded'
                >Like {likes.length}</button>
            </div>
        )
    }
}
