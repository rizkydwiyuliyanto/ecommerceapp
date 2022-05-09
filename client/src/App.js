import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Transaksiadmin from "./pages/Transaksiadmin";
import Barangadmin from "./pages/Barangadmin";
import InputBarang from "./pages/InputBarang";
import LihatBarang from "./pages/LihatBarang";
import DetailTransaksi from "./pages/DetailTransaksi";
import { UserContext } from "./UserContext.js";
import useToken from "./useToken";
function App() {
  const { token, setToken } = useToken();
  const PrivateRoute = ({ children }) => {
    const location = useLocation()
    if (!token) {
      return <Navigate to="/login" replace state={{ from: location }}/>
     }
     return children
  }

  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login SetToken = {setToken}/>} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/transaksi"
            element={
              <PrivateRoute>
                <Transaksiadmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/barang"
            element={
              <PrivateRoute>
                <Barangadmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/inputbarang"
            element={
              <PrivateRoute>
                <InputBarang />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/lihatbarang"
            element={
              <PrivateRoute>
                <LihatBarang />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/transaksi/detail"
            element={
              <PrivateRoute>
                <DetailTransaksi />
              </PrivateRoute>
            }
          >
            <Route
              path=":id_barang"
              element={
                <PrivateRoute>
                  <DetailTransaksi />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
