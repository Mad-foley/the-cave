import {useEffect, useState} from 'react'

function WinePage() {
    const [wines, setWines] = useState([])
    const getWines = async () => {
        const response = await fetch('http://localhost:8000/api/wines')
        if (response.ok) {
            const data = await response.json()
            setWines(data)
            console.log(wines)
        }
    }
    useEffect(() =>{
        getWines()
    },[])
    return (
        <div>
            <div>test</div>
        </div>
    )
}

export default WinePage
