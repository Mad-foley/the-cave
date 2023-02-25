import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useGetTokenQuery } from './store/queries/authApi';
import { useGetUsersQuery, useGetUserByIdQuery } from './store/queries/authApi';
import { useGetWineByIdQuery, useGetWinesQuery } from './store/queries/wineApi';

import CreateUserForm from './components/accounts/CreateUserModal';
import UpdateUserForm from './components/accounts/UpdateUserModal';
import DeleteUserForm from './components/accounts/DeleteUserModal';
import LogInForm from './components/accounts/LogInModal';
import LogOutForm from './components/accounts/LogOutModal';


import CreateWineForm from './components/wines/CreateWineModal';
import DeleteWineById from './components/wines/DeleteWineModal';
import UpdateWineForm from './components/wines/UpdateWineModal';
import { useGetLikesByWinesQuery, useGetLikesByUserQuery } from './store/queries/likesApi';
import LogOutWindow from './components/accounts/LogOutWindow';

import NavBar from './components/common/NavBar';
import WinePage from './pages/WinePage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

<<<<<<< HEAD
=======
import { addWine, wineState } from './store/queries/wineSlice';
import { store } from './store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

>>>>>>> main

function App() {
  // const test = useSelector(store, (state) => {state.test})

  // console.log(useSelector((state) => state.wine))



  const dispatch = useDispatch()

  const result = dispatch(addWine({name:'stuff',location:'thing'}))
  // console.log(result)
  // console.log(store.getState())

  return (
      <BrowserRouter>
        <NavBar/>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="wines">
              <Route path="" element={<WinePage/>}/>
              <Route path="create" element={<CreateWineForm/>}/>
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
