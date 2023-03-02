import { useGetCommentByWineIdQuery } from "../../store/queries/commentsApi"
import { useGetUsersQuery } from "../../store/queries/authApi"


export default function CommentModal({wine_id}) {
    const {data: comments, isSuccess} = useGetCommentByWineIdQuery(wine_id)
    const {data: users, isError} = useGetUsersQuery()

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {
            year:'numeric',
            month:'numeric',
            day:'numeric',
            hour:'numeric',
            minute:'2-digit'
        })
    }


    const handleUserMatch = (comment_user_id) => {
        let result = {name:''}
        for (let user of users) {
            console.log(user.id)
            if (user.id === comment_user_id) {
                result = user
            }
        }
        return result
    }
    if(isSuccess && !isError) {
        return (
            <div>
                <div>
                    {comments.map(comment=>{
                        return (
                            <div key={comment.id}>
                                <div className="border p-2 w-fit rounded">{comment.comment}</div>
                                <div className="ml-3">{handleUserMatch(comment.user_id).name} {formatDate(handleUserMatch(comment.user_id).created_on)}</div>
                            </div>
                        )
                    }).reverse()}
                </div>
            </div>
        )
    }
}
