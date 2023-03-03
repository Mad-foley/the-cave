import { useNavigate } from "react-router-dom"
import { useLogOutMutation } from "../../store/queries/authApi"
import { useGetTokenQuery } from "../../store/queries/authApi"
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/queries/modalSlice";


export default function LogOutForm() {
    const navigate = useNavigate()
    const {data:token} = useGetTokenQuery()
    const [logOut] = useLogOutMutation()
    const dispatch = useDispatch()
    const data = useSelector(state => state.modalWindow.modal)

    return (
        <div className="w-full fixed z-10 pt-10 mt-20">
            <div className="flex justify-center">
                <div className="bg-slate-200 text-black p-5 rounded shadow">
                    <div className="flex justify-center pb-3">Logging out {token.user.name}?</div>
                    <button
                    onClick={async () => {
                        const result = await logOut()
                        if(result.data) {
                            dispatch(setModal({
                                ...data,
                                logoutWindow: false,
                                logged: false,
                                blur: false
                            }))
                            navigate('/')
                        }
                    }}
                    className="bg-blue-500 py-2 px-4 text-white hover:bg-blue-400 mr-3 rounded-xl"
                    >Confirm</button>
                    <button
                    onClick={() => {
                        dispatch(setModal({
                            ...data,
                            logoutWindow: false,
                            blur: false,
                        }))
                    }}
                    className="bg-red-500 py-2 px-4 text-white hover:bg-red-400 rounded-xl"
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}
