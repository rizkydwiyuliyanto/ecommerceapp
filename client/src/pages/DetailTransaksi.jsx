import React from "react";
import Navbaradmin from "../components/Navbaradmin";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Styled from "styled-components";

function DetailTransaksi() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  let params = useParams();
  useEffect(()=> {
      console.log(data)
      getData() 
  }, JSON.stringify(data))
  const getData = async()=>{
      let status = await Axios.get(`http://localhost:3005/api/transaksi/${params.id_barang}`).then((res) =>{
          return res.status;
      })
      if (status == 200) {
          let data = await Axios.get(`http://localhost:3005/api/transaksi/${params.id_barang}`).then((res)=> {
              return res.data;
          })
          setData(data)
          setLoading(false);
      }
  }
  let style =  {
    "backgroundColor" :"none",
    "border" :"unset",
    "width":"100%",
    "margin":"0 0 1.5em 0",
    "overflow":"hidden",
    "height":"auto"
  }
  const formatNumber = (num) => {
      let arrNum = num.split("");
      arrNum.shift();
      arrNum.unshift(2)
      arrNum.unshift(6)
      return arrNum.join("")
}
  const gotowhatsapp = () => {
     let phoneNumber = formatNumber(data[0].no_telp)
     let namaDepan= `${data[0].nama_depan}`;
     let namaBelakang= `Nama belakang: ${data[0].nama_belakang}`;
     let alamat = `Alamat: ${data[0].alamat}`
     let barang = `Barang: ${data[0].nama_barang}`;
     let catatan = `Catatan: ${data[0].catatan}`;
     let jumlah = `Jumlah: ${data[0].jumlah}`;
     let harga = `Harga: ${data[0].price}`
     let Totalharga = `Total harga: Rp.${(data[0].jumlah * data[0].price)}`
     let url = `https://wa.me/${phoneNumber}?text=`+"Hai " + namaDepan + "%0A"+"Detail pemesanan: "+"%0A"+"%0A"+barang+"%0a"+jumlah+"%0A" + harga + "%0A" + Totalharga + "%0A" + catatan+"%0A" + alamat
     window.open(url,"_blank").focus()
  }
  return (
    <>
      <Navbaradmin />
      <AdminContent>
        <div style={{"display":"flex","justifyContent":"space-between","marginBottom":"2.5em","fontWeight":"bold"}}>
          <h2>Detail transaksi</h2>
          <Profile />
        </div>
        {loading?"Loading...":
        <>
    <div style={{"backgroundColor":"none","padding":"1.5em 1em","borderRadius":"5px","width":"90%"}}>
     <div style={{"display":"flex", "justifyContent":"space-between","flexDirection":"column","width":"100%"}}>
      <div style={style}>  
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Nama depan:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].nama_depan}</p>
      </div>
      <div style={style}>
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Nama belakang:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].nama_belakang}</p>
      </div>
     </div>   
     <div style={{"display":"flex", "justifyContent":"space-between","flexDirection":"column","width":"100%"}}>
      <div style={style}>
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Alamat:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].alamat}</p>
      </div>
      <div style={style}>
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>No telp:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].no_telp}</p>
      </div>
     </div>
     <div style={{"display":"flex", "justifyContent":"space-between","flexDirection":"column","width":"100%"}}>
      <div style={style}>
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Barang:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].nama_barang}</p>
      </div>
      <div style={style}>  
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Catatan:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].catatan}</p>
      </div>
     </div>
     <div style={{"display":"flex", "justifyContent":"space-between","flexDirection":"column","width":"100%"}}>
      <div style={style}>
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Jumlah:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].jumlah}</p>
      </div>
      <div style={style}>  
         <p style={{"background":"none","padding":"0.5em 0em","color":"#878787", "fontWeight":"bolder"}}>Harga:</p>
         <p style={{"border":"2.5px solid #afafaf","borderRadius":"3.5px","padding":"0.5em","overflow-y":"scroll","lineHeight":"23px"}}>Rp.{(data[0].jumlah) * (data[0].price)}</p>
      </div>
     </div>
     <Button onClick={gotowhatsapp}>Kirim ke {data[0].no_telp}</Button>
     </div>    
        </>
        }
      </AdminContent>
    </>
  );
}
const Button = Styled.button `
     border: none;
     padding: 1em;
     width: 22%;
     border-radius: 6px;
     background-color: #01E675;
     color: white;
     margin-top: 1.5em;
     :hover {
        cursor: pointer;
     }
`
export default DetailTransaksi;
