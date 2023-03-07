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


function App() {
  const dispatch = useDispatch()

  const client_id = Number.parseInt(Math.random() * 1000)
  const url = `ws://127.0.0.1:8000/ws/${client_id}`
  const socket = new WebSocket(url)
  socket.addEventListener('open', () => {console.log('web socket connected')})
  socket.addEventListener('close', () => {console.log('web socket disconnected')})
  socket.addEventListener('error', () => {console.log('error')})
  socket.addEventListener('message', (mes) => {
    let message = JSON.parse(mes.data)
    if (message.message === 'refetch comments'){
      dispatch(commentsApi.util.invalidateTags(["Comments"]))
    }
  })

  const modalData = useSelector(state => state.modalWindow)
  return (
      <BrowserRouter>
        <NavBar />
        {modalData.deleteUserWindow && <DeleteUserForm />}
        {modalData.loginWindow && <LogInForm />}
        {modalData.logoutWindow && <LogOutForm />}
        {modalData.deleteWindow && <DeleteWineById />}
        {modalData.blur && <div style={{height: '100vh', width: '100vw'}} className='fixed bg-transparent z-20 bg-blur'></div>}
        <div className='dark:bg-[#0E0604]'>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='recommendations' element={<RecSelect/>}/>
            <Route path="wines">
              <Route path="" element={<WinePage />}/>
              <Route path="create" element={<CreateWineForm/>}/>
              <Route path="details/:id" element={<WineDetails socket={socket}/>}/>
              <Route path="update/:id" element={<UpdateWineForm/>}/>
            </Route>
            <Route path="account">
              <Route path="" element={<UserPage/>}/>
              <Route path="create" element={<CreateUserForm/>}/>
              <Route path="update" element={<UserUpdate />} />
              <Route path="likes" element={<UserLikes />}/>
              <Route path="wines" element={<UserWines/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
