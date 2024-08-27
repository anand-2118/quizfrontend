import './App.css';
import Login from './auth/Login';
import Registration from './auth/Registration';
import Dashboard from './Components/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <div className="App">
          <Routes>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/' element={<Registration />}></Route>
            <Route path='/login' element={<Login />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
