import './App.css';
import FallingBottle from './components/common/FallingBottleLoading.js';
import WinePage from './pages/WinePage';
import { authApi, useGetTokenQuery } from './store/queries/authApi';
import LogInForm from './components/accounts/LogInModal'
import LogOutForm from './components/accounts/LogOutModal';
import { useGetUsersQuery } from './store/queries/userApi';
import CreateUserForm from './components/accounts/CreateUserModal';
import UpdateUserForm from './components/accounts/UpdateUserModal';


function App() {
  const {data : token_data } = useGetTokenQuery()
  const {data : user_data } = useGetUsersQuery()


  return (
    <div>
      <LogInForm />
      <LogOutForm />
      <CreateUserForm />
      <UpdateUserForm token={token_data} />
    </div>
  );
}

export default App;
