import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Transaksiadmin from './pages/Transaksiadmin';
import Barangadmin from './pages/Barangadmin';
import { useState } from 'react';
import InputBarang from './pages/InputBarang';
import LihatBarang from './pages/LihatBarang';

 
 

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
            <Route path="/admin/transaksi" element={<Transaksiadmin Login = {isLogin} Islogin = {(x) =>{
               setIslogin(x)
            }}/>}/>
            <Route path="/admin/barang" element={<Barangadmin Login = {isLogin} Islogin = {(x) =>{
               setIslogin(x)
            }}/>}/>
            <Route path="/admin/inputbarang" element={<InputBarang/>}/>
            <Route path="/admin/lihatbarang"element={<LihatBarang/>}/>
         </Routes>
      </BrowserRouter>
  );
}

export default App;
