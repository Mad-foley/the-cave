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
        for (let user of users) {
            if (user.id === comment_user_id) {
                return user
            }
        }
    }
    if(isSuccess && !isError) {
        return (
            <div>
                {comments.map(comment=>{
                    return (
                      <div key={comment.id}>
                        <div className="border p-2 w-full rounded mr-20 pr-4 shadow-xl dark:bg-[#453f3f]">
                          <img
                            className="inline profile-img mr-2"
                            alt=""
                            src={handleUserMatch(comment.user_id).image_url}
                            style={{ width: "30px" }}
                          />
                          <span>{comment.comment}</span>
                        </div>
                        <div className="text-end">
                          {handleUserMatch(comment.user_id).name}{" "}
                          {formatDate(
                            handleUserMatch(comment.user_id).created_on
                          )}
                        </div>
                      </div>
                    );
                }).reverse()}
            </div>
        )
    }
    else {
        return (
            <div>
                <div>Log in for more details</div>
            </div>
        )
    }
}
