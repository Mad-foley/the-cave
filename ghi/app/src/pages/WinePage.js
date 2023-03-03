import { useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'
import { rightArrow, leftArrow } from '../utilities/constants'
import LoadingAnimation from '../components/common/LoadingAnimate'


function WinePage() {
    const {data: wines, isLoading} = useGetWinesQuery()
    const [indexes, setIndexes] = useState({start:-1,end:10})
    const wineMain = document.querySelector('.winepage')
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
        if (indexes.end > wines.length-5) {
            setIndexes({start:wines.length - 10, end:wines.length})
        }
        if (wineMain) {
        wineMain.scrollTo(0,0)
        }
    }

    if (!isLoading) {
        return (
            <div>
                <div className='pt-5 p-2 relative'>
                    <div className='flex justify-center'>
                        <button className="scroll_button pr-3" onClick={()=>{setIndexes({start:-1,end:10})}}>first</button>
                        <button className="scroll_button" onClick={handlePreviousPage}>{leftArrow}</button>
                        <div className="px-5">{indexes.start+1} - {indexes.end}</div>
                        <button className="scroll_button" onClick={handleNextPage}>{rightArrow}</button>
                        <button className='scroll_button pl-3' onClick={()=>{setIndexes({start:wines.length-10,end:wines.length})}}>last</button>
                    </div>
                </div>
                <div className='winepage pt-3 pl-10 pr-10 grid place-items-center'>
                    { wines.filter((item,idx)=>idx>indexes.start && idx<indexes.end).map(wine => {
                        return (
                            <div className="winecard m-5" key={wine.id}>
                                <WineCard wine={wine} />
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
