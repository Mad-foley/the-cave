import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import CreateUserForm from './components/accounts/CreateUserModal';
import CreateWineForm from './components/wines/CreateWineModal';
import NavBar from './components/common/NavBar';
import WinePage from './pages/WinePage';
import WineDetails from './components/wines/WineDetails';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import { store } from './store/store';



import LoadingAnimation from './components/common/LoadingAnimate';

function App() {
  const [blur, setBlur] = useState(false)
  const currentWineId = store.getState().wineId.wineId.wineId

  const blurClass = () => {
    if (blur) {
      return 'bg-blur'
    }
  }

  return (
      <BrowserRouter>
        <NavBar setBlur={setBlur}/>
        <div className={blurClass()}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='recommendations' element={<LoadingAnimation/>}/>
            <Route path="wines">
              <Route path="" element={<WinePage />}/>
              <Route path="create" element={<CreateWineForm/>}/>
              <Route path="details/:id" element={<WineDetails/>}/>
            </Route>
            <Route path="account">
              <Route path="" element={<UserPage/>}/>
              <Route path="create" element={<CreateUserForm/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
