import { useCreateCommentMutation } from "../../store/queries/commentsApi";
import { useState } from "react";


export default function CreateComment({wine_id}) {
    const [createComment] = useCreateCommentMutation()
    const [formData, setFormData] = useState ({
        wine_id: 2,
        comment: ''
    })
    const handleFormChange = (e) => {
        setFormData({
            "wine_id": wine_id,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const comment = await createComment(formData)
        setFormData({
            wine_id: 2,
            comment:''
        })
    }


    return(
        <div className="text-black text-end">
            <form onSubmit={handleSubmit}>
                <input
                className="p-2 rounded-xl"
                name = "comment"
                value={formData.comment}
                onChange={handleFormChange}
                />
                <button className="likebutton rounded p-2">Submit</button>
            </form>
        </div>

    )
}
