import React from "react";
import Styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import p1 from "./produk.png";
import p2 from "./produk2.png";
import p3 from "./produk3.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from "./Loading";

const Content = (props) => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [barang, setBarang] = useState();
  const [loading, setLoading] = useState(true);
  let Ref = useRef([]);

  useEffect(() => {
    AOS.init({
      duration : 2200
    });
    if (loading){
      getData();
      console.log(data)
    }
    console.log(barang)
    for (let i = 0; i < items.length; i++) {
      if (Ref.current[i].accessKey == count) {
        Ref.current[i].className = "active";
      } else {
        Ref.current[i].className = "notActive";
      }
    }
  }, [count, JSON.stringify(data)]);

  let items = [
    {
      id: 1,
      picture: p1,

    },
    {
      id: 2,
      picture: p2,

    },
    {
      id: 3,
      picture: p3,

    },
  ];
  let image = items.find((c) => {
    return c.id === count;
  });
  const getData = async() => {
    let status = await Axios.get("http://localhost:3005/api/barang").then((res) => {
      return res.status;
    });
    if (status == 200){
      let data = await Axios.get("http://localhost:3005/api/barang").then((res) => {
        return res.data;
      })
      setData(data);
      setLoading(false);
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
   
      <Parent>
        <Child>
          <Banner>
            {/* <img style={{"borderRadius":"10px"}} src={"6007b74724c75.jpg"}/> */}
            <h2>Pupuk organik</h2>
            <a>Dari limbah sampah organik yang diolah menjadi pupuk</a>
          </Banner>
          <Image>
            <div style={{ height: "400px", border: "unset" }}>

                <img style={{"objectFit":"contain"}} src={image.picture} width={"310px"} />
              
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
                    <img style={{"objectFit":"contain"}} src={x.picture} width={"50px"} height={"50px"} />
                    <a>{x.nama_barang}</a>
                    {/* <a>Rp.12000</a> */}
                  </div>
                );
              })}
            </Product>
          </Image>
        </Child>
        <div style={{"marginTop":"1.5em","width":"100%","height":"250px", "position":"relative", "display":"flex","justifyContent":"center","alignItems":"center"}}>
            <img style={{"objectFit":"cover","borderRadius":"10px","position":"absolute","zIndex":"-2"}} src={"6007b74724c75.jpg"} width={"100%"} height={"100%"}/>
            <h2 style={{"color":"white","fontWeight":"bold"}}>Produk Kami</h2>
       </div>
        {data.map((x) => {
          return (
            <Child >
              <Image>
                <img src={x.gambar_barang} width={"250px"} />
              </Image>
              <Desc data-aos="fade-right">
                <h2
                  style={{
                    marginBottom: "0.25em",
                  }}
                >
                  {x.nama_barang}
                </h2>
                <a style={{ fontSize: "1.2rem", color: "#5B5B5B" }}>
                  Rp.{x.harga_barang}
                </a>
                <Button onClick={() => {
                   props.SetForm();
                   props.SetBarang(x.id_barang)
                }}>
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
                <a style={{ color: "#5E9B26", fontWeight: "bold" }}>
                  Deskripsi
                </a>
                <a style={{"border":"unset", "height":"100px","overflow-y":"scroll"}}>
                  {x.deskripsi_barang}
                </a>
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
   
    width: 100%;
`;
const Banner = Styled.div`
    display: flex;
    width: 50%;
     
    flex-direction: column;
    justify-content: center;
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
    box-shadow: 2.5px 2.5px 2px 2px grey;
    flex-direction: column;
    align-self: center;
    padding: 1em;
    border-radius: 5px;
    width: 45%;
    height:50%;
    justify-ontent: center;
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
margin:2em 0;
border-radius: 5px;
:hover {
  cursor: pointer;
  background-color:#3cb66b;
}
`;


export default Content;
