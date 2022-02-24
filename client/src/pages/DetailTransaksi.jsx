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
    "backgroundColor" :"#f4f4f4",
    "border" :"unset",
    "width":"45%",
    "margin":"0 0 1em 0",
    "borderRadius":"5px",
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
     let harga = `Harga: ${data[0].harga_barang}`
     let Totalharga = `Total harga: Rp.${(data[0].jumlah * data[0].harga_barang)}`
     let url = `https://wa.me/${phoneNumber}?text=`+"Hai " + namaDepan + "%0A"+"Detail pemesanan: "+"%0A"+"%0A"+barang+"%0a"+jumlah+"%0A" + harga + "%0A" + Totalharga + "%0A" + catatan+"%0A" + alamat
     window.open(url,"_blank").focus()
  }
  return (
    <>
      <Navbaradmin />
      <AdminContent>
        <div style={{"display":"flex","justifyContent":"space-between","marginBottom":"2.5em"}}>
          <h2>Detal transaksi</h2>
          <Profile />
        </div>
        {loading?"Loading...":
        <>
    <div style={{"boxShadow":"5px 3px 5px 5px #888888","padding":"1.5em 1em","borderRadius":"5px","width":"90%"}}>
    
  
     <div style={{"display":"flex", "justifyContent":"space-between","width":"100%"}}>
      <div style={style}>  
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Nama depan:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].nama_depan}</p>
      </div>
      <div style={style}>
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Nama belakang:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].nama_belakang}</p>
      </div>
     </div>   
     <div style={{"display":"flex", "justifyContent":"space-between","width":"100%"}}>
      <div style={style}>
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Alamat:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].alamat}</p>
      </div>
      <div style={style}>
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>No telp:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].no_telp}</p>
      </div>
     </div>
     <div style={{"display":"flex", "justifyContent":"space-between","width":"100%"}}>
      <div style={style}>
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Barang:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].nama_barang}</p>
      </div>
      <div style={style}>  
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Catatan:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].catatan}</p>
      </div>
     </div>
     <div style={{"display":"flex", "justifyContent":"space-between","width":"100%"}}>
      <div style={style}>
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Jumlah:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>{data[0].jumlah}</p>
      </div>
      <div style={style}>  
         <p style={{"background":"blue","padding":"0.5em","color":"white"}}>Harga:</p>
         <p style={{"padding":"0.5em", "height":"100px","overflow-y":"scroll","lineHeight":"23px"}}>Rp.{(data[0].jumlah) * (data[0].harga_barang)}</p>
      </div>
     </div>
     <Button onClick={gotowhatsapp}>Kirim</Button>
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
     width: 100%;
     border-radius: 50px;
     background-color: #01E675;
     color: white;
     :hover {
        cursor: pointer;
     }
`
export default DetailTransaksi;
