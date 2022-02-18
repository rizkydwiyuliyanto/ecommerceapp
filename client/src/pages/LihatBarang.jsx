import react from "react";
import Navbaradmin from "../components/Navbaradmin";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Styled from "styled-components";
import FormInput from "../components/FormInput";
import { useState, useEffect } from "react";
import Axios from "axios";


let style = {
  border: "1px solid #BBC4E4",
  width: "100%",
};
const Barangadmin = () => {
  let initialState = [
    {
      "id_barang":"",
      "nama_barang": "",
      "deskripsi_barang": "",
      "harga_barang": 0,
      "stok_barang": 0,
      "kategori_barang": "",
      "gambar_barang": ""
    }
  ]
  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState(initialState);
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false)
  const [id, setId] = useState();
  useEffect(() => {
    getData()
    console.log(data)
  }, [JSON.stringify(data)])
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

  const deleteData = async(id) => {
    let status = await Axios.delete(`http://localhost:3005/api/delete/${id}`).then((res) => {
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
      <AdminContent>
        <div
          className="admin"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2>Lihat barang</h2>
          <Profile />
        </div>
        <Table className="admin">
          <tr
            style={{
              borderBottom: "1px solid black",
              margin: "1em",
              height: "40px",
            }}
          >
            <th>#</th>
            <th>Nama barang</th>
            <th>Id barang</th>
            <th>Stok Barang</th>
            <th>Deskripsi barang</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
          {data.map((x, idx) => {
            return (
              <tr style={{ height: "40px" }}>
                <td>{idx + 1}</td>
                <td>{x.nama_barang}</td>
                <td>{x.id_barang}</td>
                <td>{x.stok_barang}</td>
                <td>{x.deskripsi_barang.length > 15?x.deskripsi_barang.substring(0, 15)+"...":x.deskripsi_barang}</td>
                <td>{x.harga_barang}</td>
                <td>
                  <a>
                    <button
                      onClick={() => {
                        setId(x.id_barang);
                        setPopUp(!popUp);
                      }}
                    >
                      Hapus
                    </button>
                  </a>
                  <a>
                    <button
                      onClick={async () => {
                        setPopUp2(!popUp2);
                        let status = await Axios.get(
                          `http://localhost:3005/api/barang/${x.id_barang}`
                        ).then((res) => {
                          return res.status;
                        });
                        if (status == 200) {
                          let data = await Axios.get(
                            `http://localhost:3005/api/barang/${x.id_barang}`
                          ).then((res) => {
                            return res.data;
                          });
                          setSelectData(data);
                        }
                      }}
                    >
                      Update
                    </button>
                  </a>
                </td>
              </tr>
            );
          })}
        </Table>
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
      {popUp2 ? (
        <div className="popup" id="popup-1">
          <div
            className="overlay"
            onClick={() => {
              setPopUp2(!popUp2);
              setSelectData(initialState)
            }}
          ></div>
          <div
            style={{
              border: "unset",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <div className="content">
              <div class="close-btn">
                <a
                  onClick={() => {
                    setPopUp2(!popUp2);
                    setSelectData(initialState)
                  }}
                >
                  X
                </a>
              </div>
              <Form Data={selectData} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Form = (props) => {
  let initialState = {
    "id_barang": "",
    "nama_barang": "",
    "deskripsi_barang": "",
    "harga_barang": "",
    "stok_barang": "",
    "kategori_barang": "",
    "gambar_barang": ""
  }

  const [data, setData] = useState(initialState)
  const handleSubmit = (e) => {
    console.log("test")
    e.preventDefault();
  }
  useEffect(()=> {
    let initialState = {
      "id_barang":props.Data[0].id_barang,
      "nama_barang": props.Data[0].nama_barang,
      "deskripsi_barang": props.Data[0].deskripsi_barang,
      "harga_barang": props.Data[0].harga_barang,
      "stok_barang": props.Data[0].stok_barang,
      "kategori_barang": "",
      "gambar_barang": ""
    }
    setData(initialState)
    console.log("test")
  },[JSON.stringify(props.Data)])
  const handleChange=(e) => {
    setData({
      ...data,
      [e.target.id] : e.target.value 
  })
  }
  const updateData = async(id) => {
    let status = await Axios.put(`http://localhost:3005/api/update/${id}`, {
      "nama_barang": data.nama_barang,
      "deskripsi_barang": data.deskripsi_barang,
      "harga_barang": data.harga_barang,
      "stok_barang": data.stok_barang,
    }).then((res) => {
      return res.status
    });
    if (status == 200) {
      alert("Update berhasil")
    }
  }
  return (
    <>
      <FormParent>
        <form style={{ border: "unset" ,"height":"100%","width":"90%"}} onSubmit={handleSubmit}>
          <Input>
            <label for={"namaBarang"}>Nama barang</label>
            <input value = {data.nama_barang} id={"nama_barang"} type={"text"} onChange={handleChange}/>
          </Input>
          <Input>
            <label for={"idBarang"}>Id barang</label>
            <input value = {data.id_barang} id={"id_barang"} type={"text"} onChange={handleChange}/>
          </Input>
          <Input>
            <label for={"stokBarang"}>Stok barnag</label>
            <input value = {data.stok_barang} id={"stok_barang"} type={"text"} onChange={handleChange}/>
          </Input>
          <Input>
            <label for={"deskripsiBarang"}>Deskripsi barang</label>
            <textarea value = {data.deskripsi_barang} id={"deskripsi_barang"} type={"text"} onChange={handleChange}/>
          </Input>
          <Input>
            <label for={"hargaBarang"}>Harga barang</label>
            <input value = {data.harga_barang} id={"harga_barang"} type={"text"} onChange={handleChange}/>
          </Input>
          <button onClick={() => {
            updateData(data.id_barang); 
          }}>Submit</button>
        </form>
      </FormParent>
    </>
  );
}
const Input = Styled.div `
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: center;
    input {
      height: 20px;
      padding: 1em;
    }
    textarea {
      padding: 0.5em;
      resize: none;
      overflow-y: scroll;
    }
    label {
      text-align: left;
    }
`

const FormParent = Styled.div `
    width: 100%;
    height: auto;
    display: flex;
  
  
`

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
