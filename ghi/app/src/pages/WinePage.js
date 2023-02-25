import {useEffect, useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'

import { addWine } from '../store/queries/wineSlice'
import { useDispatch } from 'react-redux'
import { store } from '../store/store'

function WinePage() {
    const {data: wines, isSuccess, isLoading} = useGetWinesQuery()
    const [indexes, setIndexes] = useState({start:0,end:9})

    const handlePreviousPage = () => {
        setIndexes({start:indexes.start - 10, end:indexes.end - 10})
        if (indexes.start < 0) {
            setIndexes({start:0, end:9})
        }
    }
    const handleNextPage = () => {
        setIndexes({start:indexes.start + 10, end:indexes.end + 10})
        if (indexes.start > wines.length) {
            setIndexes({start:0, end:9})
        }
    }

    const pageButtonClass = 'bg-white text-black font-bold p-3 rounded hover:bg-blue-500 hover:text-white'
    if (!isLoading) {
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
                    { wines.filter((item,idx)=>idx>indexes.start && idx<indexes.end).map(wine => {
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
