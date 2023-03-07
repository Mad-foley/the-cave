import { useDeleteWineMutation } from "../../store/queries/wineApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDeleteWindow, setBlur, setDeleteWine } from "../../store/queries/modalSlice";

export default function DeleteWineById({ wineId }) {
    const [deleteWineData] = useDeleteWineMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modalData = useSelector(state => state.modalWindow)

    const handleDelete = async(e) => {
        e.preventDefault()
        const response = await deleteWineData(modalData.deleteWine.id);
        if (response.data) {
            console.log(response)
            dispatch(setBlur(false))
            dispatch(setDeleteWindow(false))
            navigate("/account")
        }
    }

    const handleCancel = () => {
        dispatch(setDeleteWindow(false));
        dispatch(setBlur(false))
    }

    return (
      <div className="absolute top-0 left-0 w-full z-30 ">
        <div className="flex justify-center mt-20">
          <div className="bg-slate-200 py-10 px-10 p-3 rounded-xl">
            <div className="text-center pb-2 text-black mb-2">Are you sure?</div>
            <button className="navbutton p-1 mr-1" onClick={handleDelete}>Delete</button>
            <button className="navbutton p-1 ml-1" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
}
