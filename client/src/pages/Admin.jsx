import react from "react"
import Navbaradmin from "../components/Navbaradmin";
import { useState } from 'react';
import Login from "./Login";

const Admin = (props) =>{
    
    return (
        <>
        {/* {!props.Auth?<Login/>:<Navbaradmin/>} */}
          <Navbaradmin/>
          <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center","height":"100vh"}}>
            <h3>Dashboard</h3>
          </div>
        </>
    )
}
export default Admin;