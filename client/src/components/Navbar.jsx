import react from "react";
import Styled from "styled-components";

const Navbar = () => {
  return (
    
    <NavbarParent>
      <Logo>
        <h2 style={{"color":"#5E9B26"}}>Jualpupuk</h2>
      </Logo>
      <NavbarChild>
        <a>Home</a>
        <a>Cara gunakan</a>
        <a>Harga</a>
      </NavbarChild>
    </NavbarParent>
  );
};

const NavbarParent = Styled.div`
    display: flex;
    justify-content: space-between;
    border: unset;
    margin-top: 1em;
    position: fixed;
    top: 0;
  width: 80%;
`;
const Logo = Styled.div`
    display: block;
    width: 60%;
    border: unset;
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
        :nth-child(1){
            text-align: left;
        }
        :nth-child(2){
            text-align: center;
        }
        :nth-child(3){
            text-align: right;
        }
        :hover {
          color: #5E9B26;
          cursor: pointer;
        }
    }
`;

export default Navbar;
