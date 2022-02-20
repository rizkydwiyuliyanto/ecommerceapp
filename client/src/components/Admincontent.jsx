import React from "react";
import Styled from "styled-components";

const AdminContent = ({children}) => {
    return (
        <Parent>
            {children}   
        </Parent>
    )
}

const Parent = Styled.div`
width: 80%;
border: unset;
position: absolute;
right: 30px;
margin-top: 1.60em;
   padding:0.60em 1em;
`;

export default AdminContent