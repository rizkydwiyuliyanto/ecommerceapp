import react from "react";
import Navbaradmin from "../components/Navbaradmin";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Styled from "styled-components";
import FormInput from "../components/FormInput";
import { useState, useEffect } from "react";
import Axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { lightBlue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const color = lightBlue[600]

let style = {
  border: "1px solid #BBC4E4",
  width: "100%",
};
const columns = [
  { id: 'nama_barang', label: 'Nama barang', minWidth: 170 },
  { id: 'id', label: 'Id barang', align:"center", minWidth: 100 },
  {
    id: 'price',
    label: 'Harga',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'stok_barang',
    label: 'Stok barang',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'deskripsi_barang',
    label: 'Deskripsi barang',
    minWidth: 170,
    align: 'left',
    format: (value) => {if (value.length > 20) {
      return value.substring(0, 15) + "..."
    }}
  },
  {
    id: 'kategori_barang',
    label: 'Kategori barang',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Aksi',
    label: 'Aksi',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, [JSON.stringify(data)]);
  const getData = async () => {
    let status = await Axios.get("http://localhost:3005/api/barang").then(
      (res) => {
        return res.status;
      }
    );
    if (status == 200) {
      let data = await Axios.get("http://localhost:3005/api/barang").then(
        (res) => {
          return res.data;
        }
      );
      setData(data);
    }
  };

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
 
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: color,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'string'
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
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
  const initialState = 
  
    {
    "id":props.Data[0].id,
    "nama_barang": props.Data[0].nama_barang,
    "deskripsi_barang": props.Data[0].deskripsi_barang,
    "price": props.Data[0].price,
    "stok_barang": props.Data[0].stok_barang,
    "kategori_barang": props.Data[0].kategori_barang,
    "gambar_barang": ""
  }


  const [data, setData] = useState(initialState)
  const handleSubmit = (e) => {
    console.log("test")
    e.preventDefault();
  }
  useEffect(()=> {
    console.log(data)
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
      "price": data.price,
      "stok_barang": data.stok_barang,
      "kategori_barang" : data.kategori_barang
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
            <input value = {data.id} id={"id"} type={"text"} onChange={handleChange}/>
          </Input>
        
          <Input>
            <label for={"hargaBarang"}>Harga barang</label>
            <input value = {data.price} id={"price"} type={"text"} onChange={handleChange}/>
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
            <label for={"kategoriBarang"}>Kategori barang</label>
            <input value = {data.kategori_barang} id={"kategori_barang"} type={"text"} onChange={handleChange}/>
          </Input>
          <button style={{"alignSelf":"flex-end","padding":"0.5em 1em","background":"#0112FC","border":"none","borderRadius":"5px","color":"white"}} onClick={() => {
            updateData(data.id); 
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
