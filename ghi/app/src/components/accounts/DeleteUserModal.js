import { useDeleteUserMutation } from "../../store/queries/authApi"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setBlur, setLogged, setDeleteUserWindow } from "../../store/queries/modalSlice"
import { useLogOutMutation } from "../../store/queries/authApi"

export default function DeleteUserForm() {
    const [deleteUser] = useDeleteUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogOutMutation()

    const handleDelete = async () => {
        const result = await deleteUser();
        if (result.data === true) {
          dispatch(setBlur(false))
          dispatch(setDeleteUserWindow(false))
          dispatch(setLogged(false))
          logout()
          navigate('/')
      }
    }

    const handleCancel = () => {
        dispatch(setBlur(false));
        dispatch(setDeleteUserWindow(false));
    }

    return (
      <div className="absolute top-0 left-0 w-full z-30 ">
        <div className="flex justify-center mt-20">
          <div className="bg-slate-200 py-10 px-10 p-3 rounded-xl">
            <div className="text-center pb-2 text-black mb-2">
              Are you sure?
            </div>
            <button className="navbutton p-1 mr-1" onClick={handleDelete}>
              Delete
            </button>
            <button className="navbutton p-1 ml-1" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
}
