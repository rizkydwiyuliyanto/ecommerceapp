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
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData()
    console.log(data)
  }, [JSON.stringify(data)])
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

  const deleteData = async(id) => {
    let status = await Axios.delete(`http://localhost:3005/api/pesan/${id}`).then((res) => {
      return res.status
    });
    if (status == 200) {
      setPopUp(!popUp)
      alert("data berhasil dihapus");
      getData();
    }
  }
  return (
    <>
      <Navbaradmin />
      <div  className="admin">
      <AdminContent>
      <div style={{"display":"flex","justifyContent":"space-between","marginBottom":"2.5em"}}>
          <h2>Transaksi</h2>
          <Profile/>
      </div>
      <div>
        {loading?<p>Loading...</p>: 
        <Table>
          <thead>
          <tr style={{"backgroundColor":"#353049","margin":"0","color":"#F4F4F4"}}>
            <th>#</th>
            <th>Nama depan</th>
            <th>Nama belakang</th>
            <th>No telpon</th>
            <th>Tanggal</th>
            <th>Alamat</th>
            <th>Nama barang</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Catatan</th>
            <th>Status</th>
            <th>Hapus</th>
            <th>Detail</th>
          </tr>
          </thead>
          <tbody>
        {data.map((x, idx) => {
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{x.nama_depan}</td>
              <td>{x.nama_belakang}</td>
              <td>{x.no_telp}</td>
              <td>{x.tanggal.substring(0,10)}</td>
              <td>
                {x.alamat.length > 5
                  ? x.alamat.substring(0, 10) + "..."
                  : x.alamat}
              </td>
              <td>{x.nama_barang}</td>
              <td>{x.jumlah}</td>
              <td>Rp.{x.price * x.jumlah}</td>
              <td>{x.catatan.length > 5 ? x.catatan.substring(0, 10) + "...": x.catatan}</td>
              <td>{x.status}</td>
              <td>
                    <a
                      onClick={() => {
                        setId(x.id_pesan);
                        setPopUp(!popUp);
                      }}
                    >
                      <img style={{"cursor":"pointer"}} src={"/delete1.png"} width={"20px"} height={"20px"}/>
                    </a>

              </td>
              <td>
                    <Link to={`/admin/transaksi/detail/${x.id_pesan}`}>
                      <img src={"/document.png"} width={"20px"} height={"20px"}/>
                    </Link>
              </td>
            </tr>
          );
        })}
                </tbody>
        </Table>}
       
      </div>
      </AdminContent>
      {popUp ? (
        <div className="popup" id="popup-1">
        <div
          className="overlay"
          onClick={() => {
            setPopUp(!popUp);
          }}
        ></div>
        <div
          style={{
            border: "unset",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <div className="content">
            <div class="close-btn">
              <a
                onClick={() => {
                  setPopUp(!popUp);
                }}
              >
                X
              </a>
            </div>
            <h1 style={{ height: "50px" }}>Hapus barang ?</h1>
            <div className="option">
              <a
                onClick={() => {
                  deleteData(id);
                }}
              >
                Ya
              </a>
              <a
                onClick={() => {
                  setPopUp(!popUp);
                }}
              >
                Tidak
              </a>
            </div>
          </div>
        </div>
      </div>
      ) : (
        ""
      )}
      </div>
    </>
  );
};
const Table = Styled.table `
   border-collapse: collapse;
   width: 100%;
   text-align: center;
   border-radius: 3px;
   overflow: hidden;
   th {
     font-size: 0.75rem;
     padding: 8px;
   }
   td {
   border-bottom : 1px solid #a0a0a0;
    text-align: center;
    padding: 8px;
   }
  //  tr:nth-child(odd) {
  //    background-color: #353049;
  //    color: white;
  //  }
`
export default Transaksiadmin;
