import { useCreateLikeMutation, useDeleteLikeMutation, useGetLikesByUserQuery, useGetLikesByWinesQuery } from "../../store/queries/likesApi"
import { useGetTokenQuery } from "../../store/queries/authApi"

export default function WineCard({wine}) {
    const [like] = useCreateLikeMutation()
    const [unlike] = useDeleteLikeMutation()
    const {data: likes} = useGetLikesByWinesQuery(wine.id)
    const {data: token} = useGetTokenQuery()


    const handleLike = async (e) => {
        e.preventDefault()
        if (likes.length > 0) {
            for (let like of likes) {
                if (like.user_id === token.user.id){
                    const results = await unlike(wine.id)
                    console.log(results)
                }
                else {
                    const results = await like(wine.id)
                    console.log(results)
                }
            }
        }
        else {
            const result = await like(wine.id)
            console.log(result)
        }
    }

    return (
        <div className='flex h-full bg-white text-black rounded'>
            <div className = "text-end pr-10">
                <div className='text-xl border-b'>{wine.name}</div>
                <div>{wine.vintage}</div>
                <div>{wine.location}</div>
                <div>{wine.varietal}</div>
                <div>{wine.winery}</div>
            </div>
            <div className = "pr-10 relative overflow-hidden">
                <img
                src={wine.image_url}
                className='absolute bottom-0 h-full'
                />
            </div>
            <button
            onClick={handleLike}
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
            >Like</button>
        </div>
    )
}
