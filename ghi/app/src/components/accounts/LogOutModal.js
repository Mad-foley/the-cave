import { useLogOutMutation } from "../../store/queries/authApi"
import { useGetTokenQuery } from "../../store/queries/authApi"


export default function LogOutForm({setLogoutWindow, setLogged, setBlur}) {
    const {data:token} = useGetTokenQuery()
    const [logOut] = useLogOutMutation()

    return (
        <div className="container fixed z-10 pt-10 left-20 pr-9 ">
            <div className="flex justify-center">
                <div className="bg-slate-200 text-black p-5 rounded shadow">
                    <div className="flex justify-center pb-3">Logging out {token.user.name}?</div>
                    <button
                    onClick={async () => {
                        const result = await logOut()
                        if(result.data) {
                            setLogoutWindow(false)
                            setLogged(false)
                            setBlur(false)
                        }
                    }}
                    className="bg-blue-500 py-2 px-4 text-white hover:bg-blue-400 mr-3 rounded-xl"
                    >Confirm</button>
                    <button
                    onClick={() => {
                        setLogoutWindow(false)
                        setBlur(false)
                    }}
                    className="bg-red-500 py-2 px-4 text-white hover:bg-red-400 rounded-xl"
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}
