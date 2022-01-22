import react from "react";
import Styled from "styled-components";

const Footer = () => {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <>
      <FooterParent>
          <Child>
            <p>Copyright {year}</p>
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
text-align: center;
color: #F4F4F4;
`
export default Footer;
