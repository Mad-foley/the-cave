import { useGetUsersQuery } from "../../store/queries/authApi"
import { useGetWineByIdQuery } from "../../store/queries/wineApi"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLikesByWinesQuery } from "../../store/queries/likesApi"
import { useGetTokenQuery } from "../../store/queries/authApi"
import CreateComment from "../comments/CreateCommentModal"
import CommentModal from "../comments/Comments"
import { useDispatch } from "react-redux"
import { setBlur, setDeleteWindow, setDeleteWine } from "../../store/queries/modalSlice"


export default function WineDetails({socket}) {
    let {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data: wine, isSuccess} = useGetWineByIdQuery(id)
    const {data: users, isLoading} = useGetUsersQuery()
    const {data: likes} = useGetLikesByWinesQuery(id)
    const {data: token} = useGetTokenQuery()
    const creator = (id) => {
        for (let user of users) {
            if (user.id === id) {
            return user
            }
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {
            weekday:'long',
            year:'numeric',
            month:'short',
            day:'numeric'
        })
    }

    if (isSuccess && !isLoading && likes && token) {
        return (
          <div className="pl-10 ml-10 pt-5">
            <div className="flex mt-5 mx-10 h-full justify-center">
              <div className="pl-10">
                <div className="flex justify-between shadow-xl border-b-2 text-2xl pl-6 pr-5 pb-2 mb-5 ml-10">
                  <div style={{ fontSize: "30px" }}>{wine.name}</div>
                  <div className="ml-3">{wine.vintage}</div>
                </div>
                <div className="flex border p-4 ml-10 rounded-xl shadow-xl">
                  <div className="pr-10">
                    <div className="border p-2 rounded pr-10">
                      <div>Varietal</div>
                      <div className="ml-5 text-xl pb-1">{wine.varietal}</div>
                    </div>
                    <div className="border p-2 mt-2">
                      <div>Winery</div>
                      <div className="ml-5 text-xl pb-1">{wine.winery}</div>
                    </div>
                    <div className="border mt-2 rounded p-2">
                      <div>Appellation</div>
                      <div className="ml-5 text-xl">{wine.location}</div>
                    </div>
                  </div>
                  <div>
                    <div className="border p-2 rounded">
                      <div className="text-sm">created on</div>
                      <div className="pl-3">{formatDate(wine.created_on)}</div>
                    </div>
                    <div className="border p-2 rounded mt-2">
                      <div className="text-sm">modified on</div>
                      <div className="pl-3">{formatDate(wine.modified_on)}</div>
                    </div>
                    <br></br>
                    <div className="text-sm">Created by</div>
                    <div className="ml-5 pr-3 text-xl">
                      {creator(wine.created_by).name}
                    </div>
                  </div>
                </div>
                <div className="ml-10 pl-3">
                  <span>liked by</span>
                  <span className="pl-1 text-xl font-bold">{likes.length}</span>
                </div>
                <div className="mt-3 ml-10 border bottom-10 p-3 rounded-xl shadow-xl">
                  <div>
                    <div className="flex justify-between">
                      <div className="text-xl font-bold">Comments</div>
                      <CreateComment socket={socket} wine_id={wine.id} />
                    </div>
                    <div
                      className="relative pl-5 winepage rounded border p-2 m-2 shadow-xl"
                      style={{ height: "25vh" }}
                    >
                      <div className="absolute w-full pr-10">
                        <CommentModal wine_id={wine.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-10 pt-10 relative">
                <div className="bg-white rounded-xl py-3 shadow-xl">
                  <img
                    style={{ height: "70vh" }}
                    alt=""
                    className="rounded-xl p-5 pl-10 pr-10"
                    src={wine.image_url}
                  />
                </div>
                {token.user.id === wine.created_by && (
                  <div className="absolute top-0 right-0">
                    <button
                      onClick={() => {
                        navigate(`/wines/update/${wine.id}`);
                      }}
                      className="navbutton rounded p-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(setBlur(true));
                        dispatch(setDeleteWindow(true));
                        dispatch(setDeleteWine(wine));
                      }}
                      className="navbutton rounded p-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
    else {
        return (
            <div className="flex justify-center pt-10">
                <div style={{fontSize:'100px'}}>Log in to see details</div>
            </div>
        )
    }
}
