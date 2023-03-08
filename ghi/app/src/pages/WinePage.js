import { useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'
import { rightArrow, leftArrow } from '../utilities/constants'
import LoadingAnimation from '../components/common/LoadingAnimate'
import { useSelector } from 'react-redux'
import WineCollapsed from '../components/wines/WineCollapse'

function WinePage() {
    const {data: wines, isLoading} = useGetWinesQuery()
    const modalData = useSelector(state => state.modalWindow)
    const wineMain = document.querySelector('.winepage')
    const [query, setQuery] = useState('')
    const [sortBy, setSortBy] = useState([])
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
        if (sortBy.includes('name') && sortBy.includes('vintage')) {
            let sortedName = array.sort((a,b)=>a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
            return sortedName.sort((a,b)=>a.vintage - b.vintage)
        }
        if (sortBy.length < 2) {
            if (sortBy.includes('vintage')) {
                return array.sort((a,b)=>a.vintage - b.vintage)
            }
            if (sortBy.includes('name')) {
                return array.sort((a,b)=>a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
            }
        }
        return array
    }
    const handleFirstButton = () => {
        setIndexes({start:-1,end:10})
    }
    const handleLastButton = () => {
        setIndexes({start:filteredList().length-10,end:filteredList().length})
    }
    const handleSortBy = event => {
        if (event.target.name === "vintage") {
            event.target.checked ? setSortBy([...sortBy, 'vintage']) : setSortBy(sortBy.filter(item=>item!=='vintage'))
        }
        if (event.target.name === "name") {
            event.target.checked ? setSortBy([...sortBy, 'name']) : setSortBy(sortBy.filter(item=>item!=='name'))
        }
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
                    <div className='flex justify-center mt-4 text-black'>
                        <input className='px-1' onChange={handleSearch} placeholder=' Search'/>
                    </div>
                    <div className='pl-2 text-white text-sm flex justify-center pt-2'>
                        <div className='mr-2'>
                            <label>Vintage</label>
                            <input onChange={handleSortBy} type="checkbox" name="vintage" className='check ml-1 appearance-none w-4 h-4 bg-white rounded checked:bg-orange-400'/>
                        </div>
                        <div>
                            <label>Name</label>
                            <input onChange={handleSortBy} type="checkbox" name="name" className='check ml-1 appearance-none w-4 h-4 bg-white rounded checked:bg-orange-400'/>
                        </div>
                    </div>
                </div>
                <div className='winepage pt-3 pl-10 pr-10 grid place-items-center'>
                    {handleSortedList(filteredList()).filter((item,idx)=>idx>indexes.start && idx<indexes.end).map(wine => {
                        return (
                            <div className={modalData.expandWine.includes(wine.id) ? "winecard m-1" : "winecard m-5"} key={wine.id}>
                                {modalData.expandWine.includes(wine.id)
                                ? <WineCollapsed wine={wine}/>
                                : <WineCard wine={wine}/>
                            }
                            </div>
                        )
                    })}
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
