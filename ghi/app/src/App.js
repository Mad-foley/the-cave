import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useGetTokenQuery } from './store/queries/authApi';
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
      <BrowserRouter>
        <NavBar/>
        <div>
          <Routes>
            <Route path="/" element={<LogInForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
