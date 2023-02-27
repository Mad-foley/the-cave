import { useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'

function WinePage() {
    const {data: wines, isSuccess, isLoading} = useGetWinesQuery()
    const [indexes, setIndexes] = useState({start:-1,end:10})
    const wineMain = document.querySelector('.winepage')
    const handlePreviousPage = () => {
        setIndexes({start:indexes.start - 10, end:indexes.end - 10})
        if (indexes.start < 0) {
            setIndexes({start:-1, end:10})
        }
        wineMain.scrollTo(0,0)
    }
    const handleNextPage = () => {
        setIndexes({start:indexes.start + 10, end:indexes.end + 10})
        if (indexes.end > wines.length - 10) {
            setIndexes({start:wines.length - 10, end:wines.length - 1})
        }
        wineMain.scrollTo(0,0)
    }

    if (!isLoading) {
        return (
            <div className=''>
                <div className='pt-5 p-2 relative'>
                    <div className='flex justify-center'>{indexes.start + 1} - {indexes.end}</div>
                    <button
                    onClick={handlePreviousPage}
                    className='bg-white text-black font-bold p-3 rounded fixed left-10 hover:bg-black hover:text-white'>Previous page</button>
                    <button
                    onClick={handleNextPage}
                    className='bg-white text-black font-bold p-3 rounded fixed right-10 hover:bg-black hover:text-white'>Next Page</button>
                </div>
                <div
                className='winepage pt-3 pl-10 pr-10 grid place-items-center'>
                    { wines.filter((item,idx)=>idx>indexes.start && idx<indexes.end).map(wine => {
                        return (
                            <div className="winecard m-5" key={wine.id}>
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
