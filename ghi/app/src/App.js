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

  // const {data: user} = useGetUserByIdQuery()
  // console.log(user)
  // const {data : token_data } = useGetTokenQuery()
  // const {data : user_data } = useGetUsersQuery()
  // const {data: wine_data} = useGetWineByIdQuery(4)
  // console.log(wine_data)

  return (
      <BrowserRouter>
        <NavBar/>
        {/* < CreateWineForm /> */}
        < DeleteWineById />
        < UpdateWineForm />
        <div>
          <Routes>
            <Route path="/" element={<LogInForm/>}/>
            <Route path="login" element={<LogInForm/>}/>
            <Route path="logout" element={<LogOutForm/>}/>
            <Route path="user">
              <Route path="create" element={<CreateUserForm/>}/>
              <Route path="update" element={<UpdateUserForm/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
