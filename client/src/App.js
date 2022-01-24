import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Login from './pages/Login';
import Admin from './pages/Admin'
import { useState } from 'react';

function App() {
  const [isLogin, setIslogin] = useState(false);
  return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login Islogin = {(x) =>{
               setIslogin(x)
            }}/>}/>
            <Route path="/admin" element={<Admin Login = {isLogin} Islogin = {(x) =>{
               setIslogin(x)
            }}/>}/>
         </Routes>
      </BrowserRouter>
  );
}

export default App;
