import Navbaradmin from "../components/Navbaradmin";
import Login from "./Login";
import { Outlet } from "react-router";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";

const Admin = (props) => {
  return (
    <>
      <div>
        <Navbaradmin />
      </div>
        <AdminContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2.5em",
            }}
          >
            <h2>{props.Title}</h2>
            <Profile />
          </div>
          <Outlet />
        </AdminContent>
    </>
  );
};

export default Admin;
