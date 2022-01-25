import react, { useEffect } from "react"
import Navbaradmin from "../components/Navbaradmin";
import { useState, } from 'react';
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Admin = (props) =>{
    
    return (
        <>
        {!props.Login?<Login Islogin = {props.Islogin}/>:
        <>
        <Navbaradmin/>
        <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center","height":"100vh"}}>
            <h3>Dashboard</h3>
        </div>
        </>
        } 
        </>
    )
}
export default Admin;