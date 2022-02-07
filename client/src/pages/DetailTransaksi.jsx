import React from "react";
import Navbaradmin from "../components/Navbaradmin";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

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
  return (
    <>
      <Navbaradmin />
      <AdminContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Detal transaksi</h2>
          <Profile />
        </div>
        {loading?"Loading...":
        <>
         <p>Nama depan</p>
         <p>{data[0].nama_depan}</p>
         <p>Nama belakang</p>
         <p>{data[0].nama_belakang}</p>
         <p>Alamat</p>
         <p>{data[0].alamat}</p>
         <p>No telp</p>
         <p>{data[0].no_telp}</p>
         <p>Barang</p>
         <p>{data[0].nama_barang}</p>
         <p>Catatan</p>
         <p>{data[0].catatan}</p>
        </>
        }
      </AdminContent>
    </>
  );
}

export default DetailTransaksi;
