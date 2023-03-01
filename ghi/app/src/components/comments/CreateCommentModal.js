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
        console.log(comment)
    }


    return(
        <div className="p-10 m-10 z-20">
            <form onSubmit={handleSubmit}>
                <input
                name = "comment"
                onChange={handleFormChange}
                />
                <button>Submit</button>
            </form>
        </div>

    )
}
