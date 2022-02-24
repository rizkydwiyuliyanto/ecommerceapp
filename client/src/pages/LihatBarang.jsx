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
          style={{ display: "flex", justifyContent: "space-between" ,"marginBottom":"2.5em"}}
        >
          <h2>Lihat barang</h2>
          <Profile />
        </div>
        <Table className="admin">
          <tr
          style={{"backgroundColor":"#353049","margin":"0","color":"#F4F4F4"}}
          >
            <th>#</th>
            <th>Nama barang</th>
            <th>Id barang</th>
            <th>Stok Barang</th>
            <th>Deskripsi barang</th>
            <th>Harga</th>
            <th>Hapus</th>
            <th>Update</th>
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
                  <a onClick={() => {
                        setId(x.id_barang);
                        setPopUp(!popUp);
                      }}>
                       <img src={"/delete1.png"} width={"20px"} height={"20px"}/>
                  </a>
                </td>
                <td>
                <a onClick={async () => {
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
                      }}>
                    
               
                      <img src={"/exchange.png"} width={"20px"} height={"20px"}/>
                
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
              <Form ClosePopUp = {() => {
                setPopUp2(!popUp2);
              }} GetData = {()=> {
                getData()
              }}Data={selectData} />
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
      props.GetData()
    }
  }
  return (
    <>
      <FormParent>
        <form style={{ border: "unset" ,"height":"100%","width":"90%", "display":"flex","flexDirection":"column","height":"100%","justifyContent":"space-between","border":"unset"}} onSubmit={handleSubmit}>
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
          <button style={{"alignSelf":"flex-end","padding":"0.5em 1em","background":"#0112FC","border":"none","borderRadius":"5px","color":"white"}} onClick={() => {
            updateData(data.id_barang); 
            props.ClosePopUp()
          }}>Submit</button>
        </form>
      </FormParent>
    </>
  );
}
const Input = Styled.div `
    display: flex;
    flex-direction: row;
    height: 90px;
    border: unset;
    align-items: center;
    justify-content: space-between;
    input {
      height: 20px;
      padding: 1em;
      width: 70%;
    }
    textarea {
      padding: 0.5em;
      resize: none;
      width: 70%;
   
      overflow-y: scroll;
    }
    label {
      text-align: left;
      width: 25%;
    }
`

const FormParent = Styled.div `
    width: 100%;
    height: 900px;
    display: flex;
  
  
`
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
