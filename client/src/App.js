import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Transaksiadmin from "./pages/Transaksiadmin";
import InputBarang from "./pages/InputBarang";
import LihatBarang from "./pages/LihatBarang";
import DetailTransaksi from "./pages/DetailTransaksi";
import { context, UserContext } from './UserContext'

const PrivateRoute = ({ children }) => {
  const { Token } = useContext(context)
  const location = useLocation()
  if (!Token) {
    return <Navigate to="/login" replace state={{ from: location }}/>
   }
   return children
}
function App() {
  // const { token, setToken } = useToken();

  return (
    <BrowserRouter>
    <UserContext>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="admin" element={<PrivateRoute><Admin Title={"Transaksi"}/></PrivateRoute>}>
            <Route path = "transaksi" element={<PrivateRoute><Transaksiadmin/></PrivateRoute>}>
               <Route path = "detail" element={<>Detail</>}/>
            </Route>
          </Route>
          <Route path="/admin/transaksi/detail">
            <Route path=":id_barang" element={<PrivateRoute><DetailTransaksi/></PrivateRoute>}/>
          </Route>
          <Route path="admin" element={<PrivateRoute><Admin Title={"Input barang"}/></PrivateRoute>}>
            <Route path = "inputbarang" element={<PrivateRoute><InputBarang/></PrivateRoute>}/>
          </Route>
          <Route path="admin" element={<PrivateRoute><Admin Title={"Lihat barang"}/></PrivateRoute>}>
            <Route path = "lihatbarang" element={<PrivateRoute><LihatBarang/></PrivateRoute>}/>
          </Route>
          {/* <Route
            path="/admin/barang"
            element={
              <PrivateRoute>
                <Barangadmin />
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
          </Route> */}
        </Routes>
        </UserContext>
    </BrowserRouter>
  );
}

export default App;
