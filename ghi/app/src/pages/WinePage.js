import {useEffect, useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'


function WinePage() {
    const {data: wines, isSuccess} = useGetWinesQuery()
    if (isSuccess === true) {
        return (
            <div className = "flex flex-wrap">
                { wines.filter((item,idx)=>idx<15 && idx>3).map(wine => {
                    return (
                        <div className = "border-2  container p-5 mx-auto">
                        <WineCard wine={wine} key={wine.id} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default WinePage
