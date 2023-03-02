import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import NavBar from './components/common/NavBar';

import WinePage from './pages/WinePage';
import WineDetails from './components/wines/WineDetails';
import CreateWineForm from './components/wines/CreateWineModal';
import UpdateWineForm from './components/wines/UpdateWineModal';

import HomePage from './pages/HomePage';

import UserPage from './pages/UserPage';
import UserUpdate from './components/accounts/UserUpdate';
import UserLikes from './components/accounts/UserLikes';
import CreateUserForm from './components/accounts/CreateUserModal';

import LoadingAnimation from './components/common/LoadingAnimate';

import RecSelect from './components/recommendations/RecSelect';



function App() {
  const [blur, setBlur] = useState(false)

  return (
      <BrowserRouter>
        <NavBar setBlur={setBlur}/>
        <div className={blur ? 'bg-blur' : ''}>
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
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
