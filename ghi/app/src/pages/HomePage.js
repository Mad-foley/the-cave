import { useGetWinesQuery } from "../store/queries/wineApi"
import { useGetAllLikesQuery } from "../store/queries/likesApi"
import { useGetWineByIdQuery } from "../store/queries/wineApi"
import { useState, useEffect } from "react"
import WineCard from '../components/wines/WineCard'
import { NavLink } from "react-router-dom"


export default function HomePage() {
    const bg_img = 'https://img.freepik.com/premium-vector/rustic-vineyard-rural-landscape-with-houses-solar-tuscany-background-fields-cypress-trees-harvesting-haystacks-engraved-hand-drawn-old-sketch-vintage-style-label_248627-3126.jpg?w=2000'
    const {data:likes, isSuccess} = useGetAllLikesQuery()
    const [wineId, setWineId] = useState(4)
    const quote = '“Too much of anything is bad, but too much Champagne is just right.”'
    const textBlock = '“Drinking good wine with good food in good company is one of lifes most civilized pleasures.”'
    const {data:wine, isLoading} = useGetWineByIdQuery(wineId)
    const popular = () => {
        let popularList = {}
        for (let like of likes) {
            if (popularList[like.wine_id]) {
                popularList[like.wine_id]++
            }
            else {
                popularList[like.wine_id] = 1
            }
        }
        let mostPopular = 0
        let mostPopularWine = 0
        for (let [key,value] of Object.entries(popularList)) {
            if (value > mostPopular) {
                mostPopular = value
                mostPopularWine = key
            }
        }
        setWineId(mostPopularWine)
    }
    useEffect(()=>{
        if (isSuccess) {popular()}
    },[isSuccess])
    if (isSuccess && !isLoading) {
        return (
            <div className="relative">
                <div className="pt-10">
                    <div className="grid justify-center pt-10">
                        <div className="z-10" >
                            <div className="grid justify-center">
                                <div className="bg-wine p-5 rounded-xl">
                                    <div className="" style={{fontSize:'30px'}}>{quote}</div>
                                    <div className="grid justify-center">F. Scott Fitzgerald</div>
                                </div>

                            </div>
                            <div className="grid justify-center pt-10 mt-10">
                                <div className="pt-10 mt-10" style={{height:'600px'}}>
                                    <NavLink to='/account/create' className="likebutton p-3 rounded-xl">get started</NavLink>
                                </div>
                            </div>
                            <div className="grid justify-center">
                                <div className="bg-wine p-5 rounded-xl ">
                                    <div style={{fontSize:'30px'}} className='text-center pb-10'>Most Popular Wine</div>
                                    <WineCard wine={wine}/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-wine z-10 mt-10" style={{height:'800px', width:'100vw'}}>
                            <div style={{fontSize:'30px'}} className='pt-10 grid justify-center'>{textBlock}</div>
                            <div className="grid justify-center pb-10 mb-10">Michael Broadbent</div>
                            <div style={{fontSize:'30px'}} className='pt-10 pl-10 ml-10 pb-10'>Welcome to the CAVE</div>
                            <div style={{fontSize:'20px'}} className='flex justify-between px-10 mx-10'>
                                <div className="pl-10 ml-10">
                                    <div>Here you can curate yourself a collection of wines and share them with your friends</div>
                                    <div>Find wines in our collection and save it in your list of favorites</div>
                                    <div>Get some recommendations from us to impress your friends with new wines</div>
                                </div>
                                <div className="pr-10">
                                    <img
                                    className="rounded-xl"
                                    style={{height:'400px'}}
                                    src='https://images.squarespace-cdn.com/content/v1/5c3cdd80c258b408c8f871c9/1637010787400-UYMKKSY0BO52T540YXK6/D1BDE42D-EAE9-4588-BC33-2C17E0CA8895_1_105_c.jpeg?format=2500w'/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="fixed top-0 bg-gradient-to-l from-white rotate-[315deg] blur" style={{width:'2000px', height:'100vh'}}></div>
                <img className="fixed top-0 home-bg-img" src={bg_img} style={{mixBlendMode:'multiply', opacity:'0.5'}}/>
            </div>
        )
    }
}
