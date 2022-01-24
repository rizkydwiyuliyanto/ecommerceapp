import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Login from './pages/Login';
import Admin from './pages/Admin'

function App() {
  return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<Admin/>}/>
         </Routes>
      </BrowserRouter>
  );
}

export default App;
