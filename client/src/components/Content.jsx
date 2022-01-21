import React from "react";
import Styled from "styled-components";
import { useState,useEffect } from 'react';
import p1 from './produk.png'
import p2 from './produk2.png'
import p3 from './produk3.png'
const Content = () => {

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
     console.log(count) 
     image = items.find(c => {
       return c.id === count;
     })
     setLoading(false)
  }, loading)
 
  let items = [
    {
      "id":1,
      "picture": p1,
      "bahan":"padat"
    },
    {
      "id":2,
      "picture": p2,
      "bahan":"padat"
    },
    {
      "id":3,
      "picture": p3,
      "bahan":"cair"
    }
  ]
  let image = items.find(c => {
    return c.id === count;
  })
  return (
    <>
      <Parent>
        <Child>
          <Banner>
            <h2>Pupuk organik</h2>
            <a>Dari limbah sampah yang difermantasikan</a>
          </Banner>
          <Image>
            <div style={{height:"400px", "border":"unset"}}>
              {loading? <a>Loading</a> :<img src={image.picture} width={"310px"} />}
            </div>
            <Product>
              {items.map((x) => {
                return (
                  <div onClick={() => {
                    setCount(x.id)
                  }}>
                    <img src={x.picture} width={"50px"} height={"50px"}/>
                    <a>{x.bahan}</a>
                  </div>
                )
              })}
            </Product>
          </Image>
        </Child>
      </Parent>
    </>
  );
};

const Parent = Styled.div`
    display: block;
    width: 100%:
    border: 1px solid black;
`;

const Child = Styled.div`
    display: flex;
    height: 100vh;

`;
const Banner = Styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
   
    border: unset;
    h2 {
        font-size: 2rem;
        color: #020502;
        margin: 0.5em 0;
    }
    a {
        color: #5B5B5B;
    }
`;

const Image = Styled.div`
display: flex;
width: 50%;
flex-direction: column;
justify-content: center;
align-items: center;
border: unset;
`;
const Product = Styled.div`
   display: flex;
   border: unset;
   width: 100%;
   justify-content: space-between;
   div {
       width: 15%;
       display: flex;
       align-items: center;
       flex-direction: column;
       a {
           font-size: 0.70rem;
           font-color: #5B5B5B;
       }
       border-radius: 5px;
       padding:0.2em 0;
       border: 2px solid #020502;
       :hover {
          border: 2px solid #5E9B26;
          cursor: pointer;
       }
   }
`;
export default Content;
