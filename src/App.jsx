import { useState,useContext  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import DataDisplay from './components/DataDisplay'
import Navbar from './components/Navbar'
import Error from './components/Error';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/Profile';
import { LoginContext } from "./components/ContextProvider/Context";
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
  let token = localStorage.getItem("usersdatatoken");
  let profile = localStorage.getItem("usersprofile");

  const handleLogin = () => {
    // Implement your login logic
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Implement your logout logic
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="App">
        <Navbar/>
        <Router>
        <Routes>
          <Route path="/" element={<DataDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={profile?<Profile username={profile} />:<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
        </Router>
      
      </div>
    </>
  )
}

export default App
