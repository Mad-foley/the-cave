import {useEffect, useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'


function WinePage() {
    const {data: wines, isSuccess} = useGetWinesQuery()
    const animation = () => {
        for (const wine in wines) {
            console.log(1)

        }
        return {

            animationDelay:'1s'
        }
    }
    if (isSuccess === true) {
        return (
            <div className = "">
                <div
                className='winepage grid grid-cols-2 pt-3 pl-10 pr-10'>
                    { wines.filter((item,idx)=>idx<15 && idx>3).map(wine => {
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
