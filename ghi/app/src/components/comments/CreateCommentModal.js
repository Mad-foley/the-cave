import { useCreateCommentMutation } from "../../store/queries/commentsApi";
import { useState } from "react";


export default function CreateComment({wine_id, socket}) {
    const [createComment] = useCreateCommentMutation()
    const initialForm = {
        wine_id: 2,
        comment: ''
    }
    const [formData, setFormData] = useState (initialForm)
    const handleFormChange = (e) => {
        setFormData({
            "wine_id": wine_id,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const comment = await createComment(formData)
        if (comment.data) {
            socket.send("refetch comments")
            setFormData(initialForm)
        }
    }


    return(
        <div className="text-black text-end">
            <form onSubmit={handleSubmit}>
                <input
                className="p-2 rounded-xl text-end"
                name = "comment"
                value={formData.comment}
                onChange={handleFormChange}
                />
                <button className="likebutton rounded p-2 ml-2">Submit</button>
            </form>
        </div>

    )
}
