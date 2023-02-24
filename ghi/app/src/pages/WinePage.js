import {useEffect, useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'


function WinePage() {
    const {data: wines, isSuccess} = useGetWinesQuery()
    const [indexes, setIndexes] = useState({start:0,end:9})
    const [wineList, setWineList] = useState([])

    const handlePreviousPage = () => {
        indexes.start -= 10
        indexes.end -= 10
        if (indexes.start < 0) {
            indexes.start = 0
            indexes.end = 9
        }
        console.log(indexes)
        setWineList(wines.filter((item,idx)=>idx>indexes.start && idx<indexes.end))
    }
    const handleNextPage = () => {
        indexes.start += 10
        indexes.end += 10
        if (indexes.start > wines.length) {
            indexes.start = 0
            indexes.end = 9
        }
        console.log(indexes)
        setWineList(wines.filter((item,idx)=>idx>indexes.start && idx<indexes.end))
    }

    const pageButtonClass = 'bg-white text-black font-bold p-3 rounded hover:bg-blue-500 hover:text-white'
    if (isSuccess === true) {
        return (
            <div>
                <div className='flex justify-between pt-5'>
                    <button
                    onClick={handlePreviousPage}
                    className={pageButtonClass}>Previous page</button>
                    <button
                    onClick={handleNextPage}
                    className={pageButtonClass}>Next Page</button>
                </div>
                <div
                className='winepage grid grid-cols-2 pt-3 pl-10 pr-10'>
                    { wineList.map(wine => {
                        return (
                            <div className="winecard p-3" key={wine.id}>
                                <WineCard wine={wine}  />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default WinePage
