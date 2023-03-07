import { useDeleteWineMutation } from "../../store/queries/wineApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDeleteWindow, setBlur } from "../../store/queries/modalSlice";
import warningIcon from '../../utilities/png/warningIcon.png'


export default function DeleteWineById() {
    const [deleteWineData] = useDeleteWineMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modalData = useSelector(state => state.modalWindow)

    const handleDelete = async(e) => {
        e.preventDefault()
        const response = await deleteWineData(modalData.deleteWine.id);
        if (response.data) {
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
      <div className="absolute top-20 left-0 w-full z-30 ">
        <div className="flex justify-center mt-20">
          <div className="bg-slate-200 px-5 p-3 rounded-xl shadow-xl">
            <div className="flex justify-center">
              <img className="swirlIcon" src={warningIcon} style={{width:'100px'}}/>
            </div>
            <div className="text-center text-black">Are you sure you want to delete?</div>
            <div className="text-black text-xl font-bold text-center">{modalData.deleteWine.name} {modalData.deleteWine.vintage}</div>
            <div className="flex justify-center mt-3">
              <button className="bg-red-500 hover:bg-red-400 rounded p-1 mr-1" onClick={handleDelete}>Delete</button>
              <button className="bg-blue-500 hover:bg-blue-400 rounded p-1 ml-1" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
}
