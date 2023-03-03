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


function App() {
  const modalData = useSelector(state => state.modalWindow.modal)
  return (
      <BrowserRouter>
        <NavBar />
        {modalData.loginWindow && <LogInForm />}
        {modalData.logoutWindow && <LogOutForm />}
        <div className={modalData.blur ? 'bg-blur' : ''}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='recommendations' element={<RecSelect/>}/>
            <Route path="wines">
              <Route path="" element={<WinePage />}/>
              <Route path="create" element={<CreateWineForm/>}/>
              <Route path="details/:id" element={<WineDetails/>}/>
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
