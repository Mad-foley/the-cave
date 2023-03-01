import { useRoutes } from "react-router-dom"
import { useGetTokenQuery } from "../../store/queries/authApi"
import { useGetUserByIdQuery } from "../../store/queries/authApi"
import { useNavigate } from "react-router-dom"

export default function UserDetail() {
    const navigate = useNavigate()
    const { data: user, isLoading} = useGetUserByIdQuery()

    const handleUpdate = (e) => {
        navigate("/account/update")
    }

    const handleList = (e) => {
        navigate("/account/likes")
    }

    if(!isLoading){
        return(
            <div>
                <div>Welcome Back</div>
                <div>{user.name}</div>
                <img
                    src={user.image_url}
                    className=''
                    style={{maxHeight:'300px', minHeight:'250px'}}
                />
                <div>{user.username}</div>
                <div>{user.birthday}</div>
            <button
                onClick={handleUpdate}
                className=''
                >Update
            </button>
            <button
                onClick={handleList}
                className='likebutton'
                >Likes
            </button>
            </div>
        )
    }
}
