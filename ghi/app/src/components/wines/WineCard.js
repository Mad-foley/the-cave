import { useCreateLikeMutation, useDeleteLikeMutation, useGetLikesByUserQuery, useGetLikesByWinesQuery } from "../../store/queries/likesApi"
import { useGetTokenQuery } from "../../store/queries/authApi"
import { useNavigate } from "react-router-dom"
import filledHeart from "../../utilities/png/filledHeart.png"
import heartOutline from "../../utilities/png/heartOutline.png"
import { bookmarkFilled } from "../../utilities/constants"
import { bookmarkOutline } from "../../utilities/constants"

export default function WineCard({wine}) {
    const [like] = useCreateLikeMutation()
    const [unlike] = useDeleteLikeMutation()
    const {data: likes, isLoading} = useGetLikesByWinesQuery(wine.id)
    const {data: token} = useGetTokenQuery()
    const navigate = useNavigate()
    const handleLike = async (e) => {
        e.preventDefault()
        if (likes.length > 0) {
            let liked = false
            likes.map(item => {
                if(item.user_id === token.user.id) {
                    liked = true
                }
            })
            if(liked) {
                const result = await unlike(wine.id)
            } else {
                const result = await like(wine.id)
            }
        }
        else {
            const result = await like(wine.id)

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

    const handleWineId = () => {
        navigate(`/wines/details/${wine.id}`)
    }
    const handleHeart = () => {
        let liked = false
        if (!isLoading && token && likes) {
            for (let like of likes) {
                if (like.wine_id === wine.id) {
                    liked = true
                    }
                }
                return liked
        }
        return liked
    }
    if (!isLoading) {
        return (
            <div className='wine-body flex justify-between bg-white text-black rounded relative dark:bg-black dark:text-white' style={{height:'300px', width:'600px'}}>
                <div className="border p-3 m-3 relative" style={{width:'500px'}}>
                    <button onClick={handleWineId} className='w-full'>
                    <div className = "text-center">
                        <div className='text-xl font-bold border-b'>{wine.name}</div>
                        <div>{wine.vintage}</div>
                    </div>
                    <div className="pl-1 text-start">
                        <br></br>
                        <div>{wine.varietal}</div>
                        <div>{wine.location}</div>
                        <div>{wine.winery}</div>
                    </div>
                    </button>
                    <div className="absolute bottom-1">added: {formatDate(wine.created_on)}</div>
                </div>
                <div className = "relative mr-10" style={{width:'200px'}}>
                    <img
                    src={wine.image_url}
                    className='absolute bottom-0 p-1'
                    style={{maxHeight:'300px', minHeight:'250px'}}
                    />
                </div>
                <div className="absolute right-1 top-1 p-3">
                    <div className={handleHeart() ? "absolute top-1 right-9 invert z-10" : "absolute top-1 right-9"}>{likes ? likes.length : 0}</div>
                    <button
                    onClick={handleLike}
                    className='heartButton absolute top-0 right-5'
                    >{handleHeart() ? bookmarkFilled : bookmarkOutline}</button>
                    {/* >{handleHeart() ? <img src={filledHeart}/>:<img src={heartOutline}/>}</button> */}
                </div>
            </div>
        )
    }
}
