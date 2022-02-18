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
      <div >
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
            <th>Jumlah</th>
            <th>Catatan</th>
            <th>Aksi</th>
          </tr>
        {data.map((x, idx) => {
          return (
            <tr>
              <td>{x.nama_depan}</td>
              <td>{x.nama_belakang}</td>
              <td>{x.no_telp}</td>
              <td>
                {x.alamat.length > 5
                  ? x.alamat.substring(0, 10) + "..."
                  : x.alamat}
              </td>
              <td>{x.nama_barang}</td>
              <td>{x.jumlah}</td>
              <td>{x.catatan}</td>
              <td>
                <a>
                  <button>
                    <a
                      onClick={() => {
                        setId(x.id_pesan);
                        setPopUp(!popUp);
                      }}
                    >
                      Hapus
                    </a>
                  </button>
                </a>
                <a>
                  <button>
                    <Link to={`/admin/transaksi/detail/${x.id_pesan}`}>
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

export default Transaksiadmin;
