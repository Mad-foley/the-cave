import './App.css';
import FallingBottle from './components/common/FallingBottleLoading.js';
import WinePage from './pages/WinePage';
import { authApi, useGetUserQuery } from './store/queries/authApi';


function App() {
  const {data : token_data } = useGetUserQuery()
  console.log(token_data)

  return (
    <div>
      <FallingBottle/>
      <WinePage/>
    </div>
  );
}

export default App;
