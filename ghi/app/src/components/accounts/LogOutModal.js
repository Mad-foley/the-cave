import { useLogOutMutation } from "../../store/queries/authApi"

export default function LogOutForm({setLogoutWindow}) {
    const [logOut] = useLogOutMutation()
    return (
        <div className="container fixed z-10">
            <div className="flex justify-center">
                <div className="bg-slate-200 text-black p-5 rounded shadow">
                    <div className="flex justify-center pb-3">Are You sure ?</div>
                    <button
                    onClick={async () => {
                        const result = await logOut()
                        console.log(result)
                    }}
                    className="bg-blue-500 py-2 px-4 text-white hover:bg-blue-400"
                    >Confirm</button>
                    <button
                    onClick={() => {
                        setLogoutWindow(false)
                    }}
                    className="bg-red-500 py-2 px-4 text-white hover:bg-red-400"
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}
