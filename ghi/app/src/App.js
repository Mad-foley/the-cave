import FallingBottle from './components/common/FallingBottleLoading.js';
import WinePage from './pages/WinePage';
import { authApi, useGetTokenQuery } from './store/queries/authApi';
import LogInForm from './components/accounts/LogInModal'
import LogOutForm from './components/accounts/LogOutModal';
import { useGetUsersQuery, useGetUserByIdQuery } from './store/queries/authApi';
import CreateUserForm from './components/accounts/CreateUserModal';
import UpdateUserForm from './components/accounts/UpdateUserModal';
import { useEffect, useState } from 'react';
import DeleteUserForm from './components/accounts/DeleteUserModal';


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
      <h2 className="text-3xl font-bold underline">CSS TEST</h2>
      <LogInForm />
      <LogOutForm />
      <DeleteUserForm/>
      <CreateUserForm />
      <UpdateUserForm token={token_data} count = {setCount} />
    </div>
  );
}

export default App;
