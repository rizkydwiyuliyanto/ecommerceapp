import React from "react";
import Navbaradmin from "../components/Navbaradmin";
import Styled from "styled-components";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Transaksiadmin = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const getData = async () => {
        let status = await Axios.get("http://localhost:3005/api/transaksi").then((res) => {
          return res.status
        });
        if (status == 200) {
          let data = await Axios.get("http://localhost:3005/api/transaksi").then((res) => {
            return res.data;
          })
          setData(data)
          setLoading(false)
        }
  } 
  useEffect(() => {
    getData()
    console.log(data)
  }, JSON.stringify(data))
  return (
    <>
      <Navbaradmin />
      <div style={{ position: "relative", width: "100%" }}>
      <AdminContent>
      <div style={{"display":"flex","justifyContent":"space-between"}}>
          <h2>Transaksi</h2>
          <Profile/>
      </div>
      <div>
        {loading?<p>Loading...</p>: 
        <table style={{"width":"80%","border":"unset","text-align":"left"}}>
          <tr>
            <th>Nama depan</th>
            <th>Nama belakang</th>
            <th>No telpon</th>
            <th>Alamat</th>
            <th>Nama barang</th>
            <th>Catatan</th>
            <th>Aksi</th>
          </tr>
        {data.map((x, idx) => {
          return (
            <tr>
              <td>{x.nama_depan}</td>
              <td>{x.nama_belakang}</td>
              <td>{x.no_telp}</td>
              <td>{x.alamat}</td>
              <td>{x.nama_barang}</td>
              <td>{x.catatan}</td>
              <td>
                <a>
                  <button>
                    <Link to={`/admin/transaksi/detail/${x.id_transaksi}`}>
                      Detail
                    </Link>
                  </button>
                </a>
              </td>
            </tr>
          );
        })}
        </table>}
       
      </div>
      </AdminContent>
      </div>
    </>
  );
};

export default Transaksiadmin;
