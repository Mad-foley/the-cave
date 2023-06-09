import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from './components/common/NavBar';

import WinePage from './pages/WinePage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

import WineDetails from './components/wines/WineDetails';
import CreateWineForm from './components/wines/CreateWineModal';
import UpdateWineForm from './components/wines/UpdateWineModal';
import LogInForm from './components/accounts/LogInModal';
import LogOutForm from './components/accounts/LogOutModal';
import UserUpdate from './components/accounts/UserUpdate';
import UserLikes from './components/accounts/UserLikes';
import CreateUserForm from './components/accounts/CreateUserModal';
import RecSelect from './components/recommendations/RecSelect';
import UserWines from './components/accounts/UserWines';
import DeleteWineById from './components/wines/DeleteWineModal';
import DeleteUserForm from './components/accounts/DeleteUserModal';
import { commentsApi } from './store/queries/commentsApi';
import { useDispatch } from 'react-redux';
import {setBlur, setDeleteUserWindow, setDeleteWindow, setLoginWindow, setLogoutWindow} from './store/queries/modalSlice'
import { likesApi } from './store/queries/likesApi'
import { wineApi } from './store/queries/wineApi'


function App() {
  const dispatch = useDispatch()

  const client_id = Number.parseInt(Math.random() * 1000)
  const url = `${process.env.REACT_APP_WS_HOST}/ws/${client_id}`
  const socket = new WebSocket(url)
  socket.addEventListener('message', (text) => {
    let message = JSON.parse(text.data)
    if (message.message === 'refetch comments'){
      dispatch(commentsApi.util.invalidateTags(["Comments"]))
    }
    if (message.message === 'refetch likes'){
      dispatch(likesApi.util.invalidateTags(['Likes', 'LikesByWine']))
      dispatch(wineApi.util.invalidateTags(['Wines', 'Wine', 'Favorites', 'MyWines']))
    }
    if (message.message === 'refetch wines'){
      dispatch(wineApi.util.invalidateTags(['Wines', 'Wine', 'Favorites', 'MyWines']))
    }
  })
  const modalData = useSelector(state => state.modalWindow)
  const handleBackgroundClick = () => {
    dispatch(setBlur(false))
    dispatch(setDeleteUserWindow(false))
    dispatch(setDeleteWindow(false))
    dispatch(setLoginWindow(false))
    dispatch(setLogoutWindow(false))
  }
  return (
      <BrowserRouter basename={'/module3-project-gamma'}>
        <NavBar />
        {modalData.deleteUserWindow && <DeleteUserForm />}
        {modalData.loginWindow && <LogInForm />}
        {modalData.logoutWindow && <LogOutForm />}
        {modalData.deleteWindow && <DeleteWineById />}
        {modalData.blur && <div onClick={handleBackgroundClick} style={{height: '100vh', width: '100vw'}} className='fixed light:bg-transparent dark:bg-transparent z-20 bg-blur'></div>}
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='recommendations' element={<RecSelect/>}/>
            <Route path="wines">
              <Route path="" element={<WinePage socket={socket}/>}/>
              <Route path="create" element={<CreateWineForm socket={socket}/>}/>
              <Route path="details/:id" element={<WineDetails socket={socket}/>}/>
              <Route path="update/:id" element={<UpdateWineForm/>}/>
            </Route>
            <Route path="account">
              <Route path="" element={<UserPage/>}/>
              <Route path="create" element={<CreateUserForm/>}/>
              <Route path="update" element={<UserUpdate />} />
              <Route path="likes" element={<UserLikes socket={socket}/>}/>
              <Route path="wines" element={<UserWines/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
