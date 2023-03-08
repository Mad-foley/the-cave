import { useGetAllLikesQuery } from "../store/queries/likesApi"
import { useGetWineByIdQuery } from "../store/queries/wineApi"
import { useState, useEffect, useCallback } from "react"
import WineCard from '../components/wines/WineCard'
import { NavLink } from "react-router-dom"
import { quotes } from "../utilities/constants"
import swirlIcon from "../utilities/png/swirlIcon.png"


export default function HomePage() {
    const bg_img = 'https://img.freepik.com/premium-vector/rustic-vineyard-rural-landscape-with-houses-solar-tuscany-background-fields-cypress-trees-harvesting-haystacks-engraved-hand-drawn-old-sketch-vintage-style-label_248627-3126.jpg?w=2000'
    const {data:likes, isSuccess} = useGetAllLikesQuery()
    const [wineId, setWineId] = useState(4)
    const {data:wine, isLoading} = useGetWineByIdQuery(wineId)
    const popular = useCallback(() => {
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
    }, [likes, setWineId])
    useEffect(()=>{
        if (isSuccess) {popular()}
    },[isSuccess, setWineId, likes, popular])
    let randomNumber = Math.floor(Math.random()*quotes.length)
    let randomNumber2 = Math.floor(Math.random()*quotes.length)
    return (
      <div className="relative">
        <div className="pt-10">
          <div className="grid justify-center pt-10">
            <div className="z-10">
              <div className="home-page grid justify-center">
                <div className=" p-5 rounded-xl">
                  <div className="text-6xl">Welcome to the CAVE</div>
                  <div className="grid justify-center">
                    for wine lovers by wine lovers
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative">
                <div
                  style={{ height: "500px", width: "500px" }}
                  className="bg-transparent absolute profile-img z-20"
                ></div>
                <iframe
                  title="gif"
                  src="https://giphy.com/embed/pzGIuR1UeI2oFhyqP1"
                  width="480"
                  height="480"
                  className="profile-img gif-img"
                ></iframe>
              </div>
              <div className="home-page grid justify-center">
                <div className="pt-10 mt-10" style={{ height: "600px" }}>
                  <NavLink
                    to="/account/create"
                    className="navbutton p-3 rounded-xl border"
                  >
                    get started
                  </NavLink>
                </div>
              </div>
              <div className="home-page grid justify-center">
                {isSuccess && !isLoading && (
                  <div className="bg-wine p-5 rounded-xl ">
                    <div
                      style={{ fontSize: "30px" }}
                      className="text-center pb-10"
                    >
                      Most Popular Wine
                    </div>
                    <WineCard wine={wine} />
                  </div>
                )}
              </div>
            </div>
            <div
              className="bg-[#73343A] dark:bg-[#0E0604] z-10 mt-10"
              style={{ height: "800px", width: "100vw" }}
            >
              <div
                style={{ fontSize: "30px" }}
                className="home-page quote-1 pt-10 grid justify-center"
              >
                {quotes[randomNumber].quote}
              </div>
              <div className="grid justify-center pb-10 mb-10">
                {quotes[randomNumber].author}
              </div>
              <div
                style={{ fontSize: "20px" }}
                className="grid grid-cols-2 justify-between px-10 mx-10"
              >
                <div className="p-3 m-3 text-end lg:text-6xl md:text-4xl sm:text-xl">
                  Curate yourself a collection of wines
                </div>
                <div className="pr-10">
                  <img
                    alt=""
                    className="rounded-xl"
                    style={{ width: "600px" }}
                    src="https://images.squarespace-cdn.com/content/v1/5c3cdd80c258b408c8f871c9/1637010787400-UYMKKSY0BO52T540YXK6/D1BDE42D-EAE9-4588-BC33-2C17E0CA8895_1_105_c.jpeg?format=2500w"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#73343A] dark:bg-[#0E0604] z-10 relative">
              <div className="absolute w-full">
                <div className="text-center" style={{ fontSize: "30px" }}>
                  {quotes[randomNumber2].quote}
                </div>
                <div className="text-center">
                  {quotes[randomNumber2].author}
                </div>
              </div>
              <img
                alt=""
                className="img-multiply pt-20"
                style={{ width: "100vw" }}
                src="https://t3.ftcdn.net/jpg/03/15/93/00/360_F_315930038_dhziskNkOA8Dt24G6TCEPAV6r7bt5MEY.jpg"
              />
            </div>
            <div className="bg-[#73343A] dark:bg-[#0E0604] z-10 pb-10">
              <div className="text-center">created with a lot of wine</div>
              <div className="flex justify-center pt-10">
                <img src={swirlIcon} alt="" className="swirlIcon" />
              </div>
            </div>
          </div>
        </div>
        <img
          className="fixed top-0 img-multiply main-img"
          alt=""
          src={bg_img}
        />
      </div>
    );
}
