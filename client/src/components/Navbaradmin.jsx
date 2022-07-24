import react from "react";
import Styled from "styled-components";
import { useEffect,useRef } from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';

const color = lightBlue[600]

const CustomLink = ({ To, children, ImgUrl }) => {
    const resolved = useResolvedPath(To)
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
      <>
        <div style={{ display: "flex" }}>
          <img
            style={{ marginRight: "0.9em" }}
            src={ImgUrl}
            width={"20px"}
          />
          {match ? (
            <Link style={{ textDecoration: "none", color: "black" }} to={To}>
              {children}
            </Link>
          ) : (
            <Link style={{ textDecoration: "none"}} to={To}>
              {children}
            </Link>
          )}
        </div>
      </>
    );
}

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
        <h2 style={{"color":"#E2E7F3"}}>Admin</h2>
      </Logo>
      <NavbarChild>

       <CustomLink ImgUrl={"/transaction.png"} To="/admin/transaksi">
        <div style={{ display:"flex" }}>

        </div>
        Transaksi
       </CustomLink>
       <CustomLink ImgUrl={"/input.png"} To="/admin/inputbarang">
        Input barang
       </CustomLink>
       <CustomLink ImgUrl={"/menu.png"} To="/admin/lihatbarang">
        Lihat barang
       </CustomLink>

      </NavbarChild>

      </div>
    </NavbarParent>
  </div>
  );
};

const NavbarParent = Styled.div`
    border: unset;
    padding:0.60em 0.65em;
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
    height: 125px;
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
