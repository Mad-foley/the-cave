import { setExpandWine } from "../../store/queries/modalSlice"
import { useDispatch, useSelector } from "react-redux"


export default function WineCollapsed({wine}) {
    const dispatch = useDispatch()
    const expandedWines = useSelector(state => state.modalWindow.expandWine)
    const handleExpandButton = () => {
        dispatch(setExpandWine(expandedWines.filter(item=>item !== wine.id)))
    }
    return (
        <button onClick={handleExpandButton} className="navbutton border rounded p-1 py-3 shadow-xl" style={{width:'600px'}}>
            <div className="flex justify-between">
                <div className="font-bold text-start">{wine.name}</div>
                <div className="text-end">{wine.vintage}</div>
            </div>
        </button>
    )
}
