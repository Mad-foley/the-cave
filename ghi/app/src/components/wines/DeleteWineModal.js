import { useDeleteWineMutation } from "../../store/queries/wineApi";
import { useState } from "react";

export default function DeleteWineById() {
    const [formData, setFormData] = useState({})
    const [deleteWineData] = useDeleteWineMutation()

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await deleteWineData(formData['wine_id']);
        console.log(response)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFormChange} name="wine_id"></input>
                <button>Delete</button>
            </form>
        </div>
    )
}
