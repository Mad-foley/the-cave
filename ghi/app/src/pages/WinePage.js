import {useEffect, useState} from 'react'
import { useGetWinesQuery } from '../store/queries/wineApi'
import WineCard from '../components/wines/WineCard'

function WinePage() {
    const {data: wines, isSuccess} = useGetWinesQuery()
    if (isSuccess === true) {
        return (
            <div>
                { wines.map(wine => {
                    return (
                        <WineCard wine={wine} key={wine.id} />
                    )
                })}
            </div>
        )
    }
}

export default WinePage
