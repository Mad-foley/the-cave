import { useDeleteUserMutation } from "../../store/queries/authApi"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setBlur, setLogged, setDeleteUserWindow } from "../../store/queries/modalSlice"
import { useLogOutMutation } from "../../store/queries/authApi"
import warningIcon from '../../utilities/png/warningIcon.png'


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
      <div className="fixed top-20 left-0 w-full z-30">
        <div className="flex justify-center mt-20">
          <div className="bg-slate-200 px-10 p-3 rounded-xl shadow-xl">
            <div className="flex justify-center">
              <img
                className="swirlIcon"
                alt=""
                src={warningIcon}
                style={{ width: "100px" }}
              />
            </div>
            <div className="text-center pb-2 text-black mb-2">
              Are you sure?
            </div>
            <button
              className="bg-red-500 hover:bg-red-400 rounded p-1 mr-1"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 rounded p-1 ml-1"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
}
