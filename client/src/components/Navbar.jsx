import react from "react";
import Styled from "styled-components";
import { useEffect,useRef } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
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
    window.addEventListener("scroll",scroll)
    return () => window.removeEventListener("scroll",scroll)
  })
  let styles = {
    "textDecoration":"none"
  }
  return (
    <NavbarParent ref={RefNavbar}>
     <div style={{
       "display":"flex",
       "justifyContent":'space-between',
       "width":"80%",
       "border":"unset",
       "margin":"0 auto"
     }}>
      <Logo>
        <h2 style={{"color":"#5E9B26"}}>Jualpupuk</h2>
      </Logo>
      <NavbarChild>
        <a><Link style={styles} to={"/"}>Home</Link></a>
        <a>Harga</a>
        <a><Link style={styles} to={"/login"}>Login</Link></a>
      </NavbarChild>
      </div>
    </NavbarParent>
  );
};

const NavbarParent = Styled.div`
    border: unset;
    padding:0.60em 0;
    position: fixed;
    top: 0;
    width: 100%;
`;
const Logo = Styled.div`
    display: block;
    width: 60%;
    border: unset;
    h2 {
      :hover {
        cursor: default;
      }
    }
`;

const NavbarChild = Styled.div`
    display: flex;
    width: 40%;
    justify-content: end;
    border: unset;
    align-items: center;
    border: unset;
    a {
        width: 30%;          
        border: unset;
        text-align: right;
        // :nth-child(1){
        //     text-align: left;
        // }
        // :nth-child(2){
        //     text-align: right;
        // }
        // :nth-child(3){
        //     text-align: right;
        // }
        :hover {
          color: #5E9B26;
          cursor: pointer;
        }
    }
`;

export default Navbar;
