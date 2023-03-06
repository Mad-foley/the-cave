import { useNavigate } from "react-router-dom"
import { useLogOutMutation } from "../../store/queries/authApi"
import { useGetTokenQuery } from "../../store/queries/authApi"
import { useDispatch, useSelector } from "react-redux";
import { setLogoutWindow, setBlur, setLogged } from "../../store/queries/modalSlice";
import { useGetUserByIdQuery } from "../../store/queries/authApi"
import {wineApi} from "../../store/queries/wineApi"

export default function LogOutForm() {
    const {data:user, isSuccess} = useGetUserByIdQuery()
    const navigate = useNavigate()
    const {data:token} = useGetTokenQuery()
    const [logOut] = useLogOutMutation()
    const dispatch = useDispatch()
    const data = useSelector(state => state.modalWindow.modal)
    if (isSuccess) {
        return (
            <div className="w-full fixed z-30 pt-10 mt-20">
                <div className="flex justify-center">
                    <div className="bg-slate-200 text-black p-5 rounded shadow">
                        <div className="flex justify-center pb-3">Logging out {token.user.name}?</div>
                        <button
                        onClick={async () => {
                            const result = await logOut()
                            if(result.data) {
                                dispatch(setBlur(false))
                                dispatch(setLogged(false))
                                dispatch(setLogoutWindow(false))
                                dispatch(wineApi.util.resetApiState())
                                navigate('/')
                            }
                        }}
                        className="bg-blue-500 py-2 px-4 text-white hover:bg-blue-400 mr-3 rounded-xl"
                        >Confirm</button>
                        <button
                        onClick={() => {
                            dispatch(setBlur(false))
                            dispatch(setLogoutWindow(false))
                        }}
                        className="bg-red-500 py-2 px-4 text-white hover:bg-red-400 rounded-xl"
                        >Cancel</button>
                        <div className="flex justify-center">
                            <img src={user.image_url} style={{width:'100px', width:'100px'}} className='profile-img pt-5'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
