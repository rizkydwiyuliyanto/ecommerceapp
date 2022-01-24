import React from "react";
import Styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import p1 from "./produk.png";
import p2 from "./produk2.png";
import p3 from "./produk3.png";
import Loading from "./Loading";

const Content = () => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  let Ref = useRef([]);

  useEffect(() => {
    console.log(count);
    setLoading(false);
    for (let i = 0; i < items.length; i++) {
      if (Ref.current[i].accessKey == count) {
        Ref.current[i].className = "active";
      } else {
        Ref.current[i].className = "notActive";
      }
    }
  });

  let items = [
    {
      id: 1,
      picture: p1,
      bahan: "Pupuk padat",
      harga: "Rp15.000",
    },
    {
      id: 2,
      picture: p2,
      bahan: "Pupuk padat",
      harga: "Rp15.000",
    },
    {
      id: 3,
      picture: p3,
      bahan: "Pupuk cair",
      harga: "Rp14.000",
    },
  ];
  let image = items.find((c) => {
    return c.id === count;
  });
  
  return (
    <>
      <Parent>
        <Child>
          <Banner>
            <h2>Pupuk organik</h2>
            <a>Dari limbah sampah yang difermantasikan</a>
          </Banner>
          <Image>
            <div style={{ height: "400px", border: "unset" }}>

                <img src={image.picture} width={"310px"} />
              
            </div>
            <Product>
              {items.map((x, idx) => {
                return (
                  <div
                    accessKey={idx + 1}
                    ref={(el) => (Ref.current[idx] = el)}
                    onClick={() => {
                      setCount(x.id);
                    }}
                  >
                    <img src={x.picture} width={"50px"} height={"50px"} />
                    <a>{x.bahan}</a>
                    {/* <a>Rp.12000</a> */}
                  </div>
                );
              })}
            </Product>
          </Image>
        </Child>
        {items.map((x) => {
          return (
            <Child>
              <Image>
                <img src={x.picture} width={"320px"} />
              </Image>
              <Desc>
                <h2
                  style={{
                    marginBottom: "0.25em",
                  }}
                >
                  {x.bahan}
                </h2>
                <a style={{ fontSize: "1.2rem", color: "#5B5B5B" }}>
                  {x.harga}
                </a>
                <a style={{ color: "#5E9B26", fontWeight: "bold" }}>
                  Deskripsi
                </a>
                <a>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Blanditiis ad reprehenderit optio obcaecati libero ipsam ut
                  aliquam error quae delectus, assumenda id, maiores, quas
                  facere fuga ex eveniet aliquid at?
                </a>
                <Button>
                  <img src={"whatsapp2.png"} width={"15px"} />
                  <a
                    style={{
                      position: "relative",
                      top: "-2px",
                    }}
                  >
                    {" "}
                    Beli sekarang
                  </a>
                </Button>
              </Desc>
            </Child>
          );
        })}
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
       :hover {
          border: 2px solid #5E9B26;
          cursor: pointer;
       }
   }
`;

const Desc = Styled.div`
    display: flex;
    border: unset;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    a {
      margin: 0.2em 0;
    }
`;
const Button = Styled.button`
background-color:#44CB77;
color:#F4F4F4;
border:none;
width:150px;
padding:1em 0;
margin-top:2em;
border-radius: 5px;
:hover {
  cursor: pointer;
  background-color:#3cb66b;
}
`;
export default Content;
