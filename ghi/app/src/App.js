import './App.css';
import FallingBottle from './components/common/FallingBottleLoading.js';
import WinePage from './pages/WinePage';
import { authApi, useGetTokenQuery } from './store/queries/authApi';
import LogInForm from './components/accounts/LogInModal'
import LogOutForm from './components/accounts/LogOutModal';
import { useGetUsersQuery } from './store/queries/authApi';
import CreateUserForm from './components/accounts/CreateUserModal';
import UpdateUserForm from './components/accounts/UpdateUserModal';
import { useEffect, useState } from 'react';


function App() {
  const getToken = async () => {
    const response = await fetch('http://localhost:8000/token');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }
  const [count, setCount] = useState(0)
  useEffect(() => {getToken()}, [count])



  const {data : token_data } = useGetTokenQuery()
  const {data : user_data } = useGetUsersQuery()
  console.log(token_data)

  return (
    <div>
      <LogInForm />
      <LogOutForm />
      <CreateUserForm />
      <UpdateUserForm token={token_data} count = {setCount} />
    </div>
  );
}

export default App;
