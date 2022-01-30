import react, { useEffect } from "react";
import Navbaradmin from "../components/Navbaradmin";
import { useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

const Admin = (props) => {
  return (
    <>
      {!props.Login ? (
        <Login Islogin={props.Islogin} />
      ) : (
        <>
       <div>   
       <Navbaradmin/>
       </div>
          
        </>
      )}
    </>
  );
};

export default Admin;
