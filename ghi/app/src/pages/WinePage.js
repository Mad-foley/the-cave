import { useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'
import { rightArrow, leftArrow } from '../utilities/constants'
import LoadingAnimation from '../components/common/LoadingAnimate'
import { useSelector, useDispatch } from 'react-redux'
import WineCollapsed from '../components/wines/WineCollapse'
import { setExpandWine } from "../store/queries/modalSlice"


function WinePage() {
    const dispatch = useDispatch()
    const {data: wines, isLoading} = useGetWinesQuery()
    const modalData = useSelector(state => state.modalWindow)
    const wineMain = document.querySelector('.winepage')
    const [query, setQuery] = useState('')
    const [collapseAll, setCollapseAll] = useState(false)
    const [orderBy, setOrderBy] = useState('')
    const [indexes, setIndexes] = useState({start:-1,end:10})
    const handlePreviousPage = () => {
        setIndexes({start:indexes.start - 10, end:indexes.end - 10})
        if (indexes.start < 0) {
            setIndexes({start:-1, end:10})
        }
        if (wineMain) {
            wineMain.scrollTo(0,0)
        }
    }
    const handleNextPage = () => {
        setIndexes({start:indexes.start + 10, end:indexes.end + 10})
        if (indexes.end > filteredList().length-5) {
            setIndexes({start:filteredList().length - 10, end:filteredList().length})
        }
        if (wineMain) {
        wineMain.scrollTo(0,0)
        }
    }

    const handleSearch = (e) => {
        setQuery(e.target.value)
        setIndexes({start:-1, end:10})
    }

    const filteredList = () => {
        let result = []
        for(let wine of wines) {
            if(wine.name.toUpperCase().includes(query.toUpperCase())){
                result.push(wine)
            }
            if(wine.vintage.includes(query)){
                result.push(wine)
            }
            if(wine.location.toUpperCase().includes(query.toUpperCase())){
                result.push(wine)
            }
        }
        let unique = [...new Set(result)]
        return unique
    }
    const handleSortedList = (array) => {
        if (orderBy === "year") {
            return array.sort((a,b)=>a.vintage - b.vintage)
        }
        if (orderBy === "name") {
            return array.sort((a,b)=>a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
        }
        return array
    }
    const handleFirstButton = () => {
        setIndexes({start:-1,end:10})
    }
    const handleLastButton = () => {
        setIndexes({start:filteredList().length-10,end:filteredList().length})
    }
    const handleOrderBy = (e) => {
        setOrderBy(e.target.value)
    }
    const handleCollapseButton = () => {
        setCollapseAll(!collapseAll)
        const wineIds = []
        for (let wine of wines) {
            wineIds.push(wine.id)
        }
        collapseAll
        ? dispatch(setExpandWine([...wineIds]))
        : dispatch(setExpandWine([]))
    }
    const handleClearButton = () => {
        setQuery('')
    }
    if (!isLoading) {
        return (
            <div>
                <div className='pt-5 p-2 relative'>
                    <div className='flex justify-center'>
                        <button className="scroll_button pr-3" onClick={handleFirstButton}>first</button>
                        <button className="scroll_button" onClick={handlePreviousPage}>{leftArrow}</button>
                        <div className="px-5">{indexes.start+1} - {indexes.end}</div>
                        <button className="scroll_button" onClick={handleNextPage}>{rightArrow}</button>
                        <button className='scroll_button pl-3' onClick={handleLastButton}>last</button>
                    </div>
                    <div className='flex justify-center items-center mt-4 text-black'>
                        <button onClick={handleClearButton} className='navbutton text-white px-1 rounded mr-1 border text-sm mt-2'>clear</button>
                        <input value={query} className='px-1 text-end rounded mt-2' onChange={handleSearch} placeholder='Search...'/>
                        <div className='pl-2 text-white text-sm flex justify-center items-center pt-2 gap-1'>
                            <div>Order by:</div>
                            <button value="year" className={orderBy === "year" ? 'dark:bg-[#595454] bg-white text-[#73343A] dark:text-white px-1 rounded' : 'px-1 border rounded'} onClick={handleOrderBy}>year</button>
                            <button value="name" className={orderBy === "name" ? 'dark:bg-[#595454] bg-white text-[#73343A] dark:text-white px-1 rounded' : 'px-1 border rounded'} onClick={handleOrderBy}>name</button>
                            <button value="" className={orderBy === "" ? 'dark:bg-[#595454] bg-white text-[#73343A] dark:text-white px-1 rounded' : 'px-1 border rounded'} onClick={handleOrderBy}>none</button>
                            <div>||</div>
                            <button className='navbutton px-1 rounded border' onClick={handleCollapseButton}>{collapseAll ? 'close all' : 'open all'}</button>
                        </div>
                    </div>
                </div>
                <div className='winepage pt-3 pl-10 pr-10 grid justify-center'>
                    <div>
                        {handleSortedList(filteredList()).filter((item,idx)=>idx>indexes.start && idx<indexes.end).map(wine => {
                            return (
                                <div className={modalData.expandWine.includes(wine.id) ? "winecard m-1" : "winecard m-1 mb-5"} key={wine.id}>
                                    {modalData.expandWine.includes(wine.id)
                                    ? <WineCollapsed wine={wine}/>
                                    : <WineCard wine={wine}/>
                                }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <LoadingAnimation/>
            </div>
        )
    }
}

export default WinePage
