import react from "react";
import Styled from "styled-components";
import { useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';

const color = lightBlue[600]

const Navbaradmin = () => {
  const RefNavbar = useRef();
  const scroll = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      RefNavbar.current.className = "test"
      console.log("ok")
  }else {
      RefNavbar.current.className = "test2"
  }
  }

  useEffect(() => {
    // window.addEventListener("scroll",scroll)
    // return () => window.removeEventListener("scroll",scroll)
  })
  let styles = {
    "textDecoration":"none",
    "color":"#E2E7F3",
  }
  return (
  <div style={{"display":"flex"}}>
    <NavbarParent ref={RefNavbar} className="admin">
     <div style={{
       "display":"flex",
       "flexDirection":"column",
       "justifyContent":'start',
        "height":"100%",
       "width":"80%",
       "border":"unset",
       "margin":"0 auto"
     }}>
      <Logo>
        <h2 style={{"color":"#E2E7F3"}}>Your logo</h2>
      </Logo>
      <NavbarChild>
       
       <div style={{display: "flex"}}>
         <img style={{"marginRight":"0.9em"}} src={"/transaction.png"} width={"30px"} height={"25px"}/>
         <Link style={{textDecoration:"none"}} to="/admin/transaksi">Transaksi</Link>
       </div>

<div style={{display: "flex"}}>
          <img style={{"marginRight":"0.9em"}} src={"/input.png"} width={"30px"} height={"25px"}/>
          <Link style={{textDecoration:"none"}} to ="/admin/inputbarang">Input barang</Link>
</div>
  
<div style={{display: "flex"}}>
          <img style={{"marginRight":"0.9em"}} src={"/menu.png"} width={"30px"} height={"25px"}/>
          <Link style={{textDecoration:"none"}} to ="/admin/lihatbarang">Lihat barang</Link>
</div>

      </NavbarChild>

      </div>
    </NavbarParent>
  </div>
  );
};

const NavbarParent = Styled.div`
    border: unset;
    padding:0.60em 1em;
   position: fixed;
   background-color: ${color};
    height: 100vh;
    width: 16%;
`;
const Logo = Styled.div`
    display: block;
    width: 100%;
    border: unset;
    height: 65px;
    margin-top: 1.5em;
    h2 {
      :hover {
        cursor: default;
      }
    }
`;

const NavbarChild = Styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    border: unset;
    height: 150px;
    justify-content: space-between;
    a {
        display: flex;
        width: 100%;      
        border: unset;
        font-weight: bold;
        font-size: 1.05rem;
        // :nth-child(1){
        //     text-align: left;
        // }
        // :nth-child(2){
        //     text-align: right;
        // }
        // :nth-child(3){
        //     text-align: right;
        // }
        color: #E2E7F3;
        :hover {
          cursor: pointer;
        }
    }
`;

export default Navbaradmin;
