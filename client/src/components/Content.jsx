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
import { CartProvider, useCart } from 'react-use-cart';


const Page = (props) => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [barang, setBarang] = useState();
  const [loading, setLoading] = useState(true);
  const [isHover, setIsHover] = useState(false);
  let Ref = useRef([]);
  let Ref2 = useRef([]);
  let countRef = useRef();

  const {
    addItem,
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart()

  useEffect(() => {
    AOS.init({
      duration : 2200
    });
      getData();
      console.log(items)
      console.log(isEmpty)
      if (!isEmpty) {
        data.map((p) => {
          removeItem(p.id)
        })
      }
      data.map((p) => {
        addItem(p)
      })
      if (data.length > 0) {
        setLoading(false)

    }
    if (!loading){
      for (let i = 0; i < picture.length; i++) {
        if (Ref.current[i].accessKey == count) {
          Ref.current[i].className = "active";
        } else {
          Ref.current[i].className = "notActive";
        }
      }
    }
  }, [loading, JSON.stringify(data)]);

  let picture = [
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
  let image = picture.find((c) => {
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

  const handleHover = ()=> {
    setIsHover(!isHover);
}



  var linkStyle;
  if (isHover){
      linkStyle = { cursor: "pointer", padding: "0.2em", color: "#44CB77" };
  }else {
      linkStyle = {cursor: "default", padding: "0.2em", color: "#44CB77" }
  }
  return (
    <>
    {loading ? 
    <Loading/>
    :
    <Parent>
        <Child>
          <Banner>
            {/* <img style={{"borderRadius":"10px"}} src={"6007b74724c75.jpg"}/> */}
            <h1 style={{ color: "#5E9B26" }}>Selamat datang di website kami</h1>
            <br />
            <br />
            <h2>Pupuk organik</h2>
            <a>Dari limbah sampah organik yang diolah menjadi pupuk</a>
          </Banner>
          <Image>
            <div style={{ height: "400px", border: "unset" }}>
              <img
                style={{ objectFit: "contain" }}
                src={image.picture}
                width={"310px"}
              />
            </div>

            <Product>
              {picture.map((x, idx) => {
                return (
                  <div
                    accessKey={idx + 1}
                    ref={(el) => (Ref.current[idx] = el)}
                    onClick={() => {
                      setCount(x.id);
                    }}
                  >
                    <img
                      style={{ objectFit: "contain" }}
                      src={x.picture}
                      width={"50px"}
                      height={"50px"}
                    />
                    <a>{x.nama_barang}</a>
                    {/* <a>Rp.12000</a> */}
                  </div>
                );
              })}
            </Product>
          </Image>
        </Child>

        <div
          style={{
            marginTop: "1.5em",
            width: "100%",
            height: "250px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              borderRadius: "10px",
              position: "absolute",
              zIndex: "-2",
            }}
            src={"6007b74724c75.jpg"}
            width={"100%"}
            height={"100%"}
          />
          <h2 style={{ color: "white", fontWeight: "bold" }}>Produk Kami</h2>
        </div>
      
        {items.map((x, idx) => {
          return (
            <>
              <Child key={x.id}>
                <Image>
                  <img src={x.gambar_barang} width={"250px"} />
                </Image>
                <Desc data-aos="fade-right">
                  <h1
                    style={{
                      marginBottom: "0.25em",
                    }}
                  >
                    {x.nama_barang}
                  </h1>
                  <a style={{ fontSize: "1.2rem", color: "#5B5B5B" }}>
                    Rp.{x.price * x.quantity}
                  </a>
                  <div>
                    <a style={{ position: "relative", top: "25px" }}>
                      Stok: {x.stok_barang}
                    </a>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "300px",
                        border: "unset",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          border: "unset",
                          borderRadius: "5px",
                          width: "35%",
                          textAlign: "center",
                          alignItems: "center",
                          padding: "0 0.15em",
                        }}
                      >
                        <a
                          style={linkStyle}
                          onClick={() => {
                            // props.Counter(-1)
                            // Ref2.current[idx].innerText = props.Jumlah
                            if (x.quantity > 1){
                              updateItemQuantity(x.id, x.quantity - 1)
                            }
                          }}
                        >
                          <img
                            style={{ position: "relative", left: "2.8px" }}
                            src="/minus2.png"
                            width={"10px"}
                            height={"10px"}
                          />
                        </a>
                        <a
                          ref={(el) => (Ref2.current[idx] = el)}
                          style={{ width: "60%", border: "unset" }}
                        >
                          {x.quantity}
                        </a>
                        <a
                          style={linkStyle}
                          onClick={() => {
                            // props.Counter(1)
                            // Ref2.current[idx].innerText = props.Jumlah
                            if (x.quantity < x.stok_barang){
                              updateItemQuantity(x.id, x.quantity + 1)
                            }
                          }}
                        >
                          <img src="/plus.png" width={"10px"} height={"10px"} />
                        </a>
                      </div>
                      <Button
                        onClick={() => {
                          props.SetForm();
                          props.SetBarang(x.id_barang);
                           
                        }}
                      >
                        <img
                          style={{
                            position: "relative",
                            top: "2px",
                            // fontSize:"1rem"
                          }}
                          src={"whatsapp2.png"}
                          width={"15px"}
                        />
                        <a
                          style={{
                            position: "relative",

                            // fontSize:"1rem"
                          }}
                        >
                          {" "}
                          Beli sekarang
                        </a>
                      </Button>
                    </div>
                  </div>
                  <a
                    style={{
                      borderTop: "1.5px solid grey",
                      paddingTop: "0.9em",
                      color: "#5E9B26",
                      fontWeight: "bold",
                    }}
                  >
                    Deskripsi
                  </a>
                  <a
                    style={{
                      borderTop: "unset",
                      height: "150px",
                      "overflow-y": "scroll",
                      lineHeight: "25px",
                      paddingRight: "0.6em",
                    }}
                  >
                    {x.deskripsi_barang}
                  </a>
                </Desc>
              </Child>
            </>
          );
        })}
      </Parent>}
      
    </>
  );
};

const Parent = Styled.div`
    display: block;
    width: 100%:
  
 
`;

const Child = Styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;

const Ingredient = Styled.div `
  display: block;
  text-align: center;
`

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
    height:auto;
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
width: 60%;
:hover {
  cursor: pointer;
  background-color:#3cb66b;
}
`;

const Content = (props) => {
  return (
  <CartProvider>
    <Page SetForm={()=>{
      props.SetForm()
      
    }}
    // SetBarang = {() => {
    //   props.SetBarang()
    // }}
    />
  </CartProvider>
  )
}

export default Content