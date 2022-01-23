import react from "react";
import Styled from "styled-components";

const Footer = () => {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <>
      <FooterParent>
        <Child>
          <div style={{
            "display":"flex",
            "height" :"50px",
            "border":"unset",
            "width":"50%"
          }}>
          <div style={{"border":"unset", "marginRight":"0.5em"}}>
            <img src={"placeholder.png"} width={"15px"} />
          </div>
            <a style={{"border":"unset"}}>Kota jayapura, Papua, Indonesia</a>
          </div>
          <p style={{ fontSize: "0.95rem", "width":"50%","border":"unset"}}>
            Your copyright here {year}
          </p>
        </Child>
      </FooterParent>
    </>
  );
};

const FooterParent = Styled.div`
border: unset;
padding:1em 0;
width: 100%;
background-color: #020502;

`;

const Child = Styled.div `
width: 80%;
margin: 0 auto;
color: #F4F4F4;
display: flex;
flex-direction: column;
justify-content: end;
 
`
export default Footer;
