import react from "react";
import Navbaradmin from "../components/Navbaradmin";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Styled from "styled-components";
import FormInput from "../components/FormInput";
import { useState, useEffect } from "react";
import Axios from "axios";
import p1 from "../components/produk.png";
import p2 from "../components/produk2.png";
import p3 from "../components/produk3.png";

let style = {
  border: "1px solid #BBC4E4",
  width: "100%",
};
const Barangadmin = () => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   getData()
  //   console.log(data)
  // }, [JSON.stringify(data)])
  const getData = async() => {
      let status = await Axios.get("http://localhost:3005/api/barang").then((res) => {
          return res.status
      })
      if (status == 200){
          let data = await Axios.get("http://localhost:3005/api/barang").then((res) => {
              return res.data
          })
          setData(data);
      }
  }

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

  return (
    <>
      <Navbaradmin />
      <AdminContent>
        <div  className="admin" style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Barang</h2>
        <Profile />
        </div>
        <FormInput/>
        {/* <Table className="admin">
          <tr style={{"borderBottom":"1px solid black","margin":"1em","height":"40px"}}>
              <th>#</th>
              <th>Nama barang</th>
              <th>Stok Barang</th>
              <th>Deskripsi barang</th>
              <th>Harga</th>
          </tr>
          {data.map((x, idx) => {
              return (
                  <tr style={{"height":"40px"}}>
                      <td>{idx}</td>
                      <td>{x.nama_barang}</td>
                      <td>{x.stok_barang}</td>
                      <td>{x.deskripsi_barnag}</td>
                      <td>{x.harga_barang}</td>
                  </tr>
              )
          })}
        </Table> */}
     {/* <div style={{"display":"flex","justifyContent":"space-between","width":"90%","marginTop":"3em"}}>
         {items.map((x, idx)=> {
             return (
                <Card>
                <div style={{"height":"250px"}}>
                    <img style={{"objectFit":"cover"}} width={"200px"} src={x.picture}/>
                </div>
                <div style={{"height":"100px", "display":"flex", "flexDirection":"column","justifyContent":"space-around"}}>
                    <a>{x.bahan}</a>
                    <a>Harga: {x.harga}</a>
                </div>
                </Card>
             )
         })}
     </div> */}
      </AdminContent>
    </>
  );
};

const Table = Styled.table `
  width: 70%;
  background-color: #F5F8FB;
  padding: 0.5em;
  tr {
     
      border: 1px solid black;
      width: 100%;
  }
  th {
      text-align: left;
  }
`
const Card = Styled.div `
   display: flex;
   flex-direction: column;
   width: 30%;
   text-align:center;
   background-color: #F3F3F3;
   border-radius: 10px;
   box-shadow: 0px 1px 2px 1px #b1b3b5;
`
export default Barangadmin;
