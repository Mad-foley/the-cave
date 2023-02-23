<<<<<<< HEAD
import FallingBottle from './components/common/FallingBottleLoading.js';
import WinePage from './pages/WinePage';
import { authApi, useGetTokenQuery } from './store/queries/authApi';
import LogInForm from './components/accounts/LogInModal'
import LogOutForm from './components/accounts/LogOutModal';
=======
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useGetTokenQuery } from './store/queries/authApi';
>>>>>>> a2a53a414bb680f9c629090612bc97e96f571192
import { useGetUsersQuery, useGetUserByIdQuery } from './store/queries/authApi';

import CreateUserForm from './components/accounts/CreateUserModal';
import UpdateUserForm from './components/accounts/UpdateUserModal';
import DeleteUserForm from './components/accounts/DeleteUserModal';
import LogInForm from './components/accounts/LogInModal';
import LogOutForm from './components/accounts/LogOutModal';

import NavBar from './components/common/NavBar';


function App() {
  const getToken = async () => {
    const response = await fetch('http://localhost:8000/token');
    if (response.ok) {
      const data = await response.json();
    }
  }
  const [count, setCount] = useState(0)
  useEffect(() => {getToken()}, [count])


  const {data: user} = useGetUserByIdQuery()
  console.log(user)
  const {data : token_data } = useGetTokenQuery()
  const {data : user_data } = useGetUsersQuery()

  return (
    <div>
<<<<<<< HEAD
      <h2 className="text-3xl font-bold underline">CSS TEST</h2>
      <LogInForm />
      <LogOutForm />
      <DeleteUserForm/>
      <CreateUserForm />
      <UpdateUserForm token={token_data} count = {setCount} />
=======
      <BrowserRouter>
        <NavBar/>
        <div>
          <Routes>
            <Route path="/" element={<LogInForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>
>>>>>>> a2a53a414bb680f9c629090612bc97e96f571192
    </div>
  );
}

export default App;
