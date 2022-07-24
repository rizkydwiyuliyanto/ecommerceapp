import React, { useContext } from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { context } from "../UserContext";
import { Outlet } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { lightBlue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import Alert from '@mui/material/Alert';

const columns = [
  { label: "#", minWidth: 20 },
  { id: "nama_depan", label: "Nama depan", minWidth: 170, align: "center" },
  {
    id: "nama_belakang",
    label: "Nama belakang",
    minWidth: 170,
    align: "center",
  },
  { id: "no_telp", label: "No telepon", minWidth: 170, align: "center" },
  { id: "alamat", label: "alamat", minWidth: 170, align: "center" },
  {
    id: "nama_barang",
    label: "Nama barang",
    minWidth: 150,
    align: "center",
    format: (value) => {
      if (value.length > 20) {
        return value.substring(0, 15) + "...";
      }
      return value;
    },
  },
  { id: "jumlah", label: "jumlah", minWidth: 170, align: "center" },
  { id: "price", label: "harga", minWidth: 50, align: "center" },
  {
    id: "catatan",
    label: "catatan",
    minWidth: 150,
    align: "center",
    format: (value) => {
      if (value.length > 20) {
        return value.substring(0, 15) + "...";
      }
      return value;
    },
  },
  { id: "status", label: "status", minWidth: 170, align: "center" },
  {
    id: "tanggal",
    label: "tanggal",
    minWidth: 150,
    align: "center",
    format: (value) => {
      let pattern = /(?=[A-z])/;
      let length = value.search(pattern);
      return value.substring(0, length);
    },
  },
  {
    id: "Aksi",
    label: "Aksi",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Transaksiadmin = () => {
  const [data, setData] = useState();
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const { Data, Loading, Seturl } = useContext(context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const color = lightBlue[600];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  }, [JSON.stringify(data), id]);
  const getData = async () => {
    let status = await Axios.get("http://localhost:3005/api/transaksi").then(
      (res) => {
        return res.status;
      }
    );
    if (status == 200) {
      let data = await Axios.get("http://localhost:3005/api/transaksi").then(
        (res) => {
          return res.data;
        }
      );
      setData(data);
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    let status = await Axios.delete(
      `http://localhost:3005/api/pesan/${id}`
    ).then((res) => {
      return res.status;
    });
    if (status == 200) {
      getData();
    }
  };

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <div>
        <Outlet />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, idx) => (
                      <StyledTableCell
                        key={column.id+""+idx}
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
                    .map((row, idx) => {
                      return (
                        <StyledTableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code+""+idx}
                        >
                          {columns.map((column, idx) => {
                            const value = row[column.id];
                            return (
                              <StyledTableCell
                                key={column.id+""+idx}
                                align={column.align}
                              >
                                {column.label == "#" ? idx + 1 : ""}
                                {column.format && typeof value === "string"
                                  ? column.format(value)
                                  : value}
                                {column.id == "Aksi" ? (
                                  <PopupState
                                    variant="popover"
                                    popupId="demo-popup-menu"
                                  >
                                    {(popupState) => (
                                      <React.Fragment>
                                        <MoreVertIcon
                                          variant="contained"
                                          {...bindTrigger(popupState)}
                                        />
                                        <Menu {...bindMenu(popupState)}>
                                          <MenuItem
                                            onClick={() => {
                                              popupState.close();
                                              handleClickOpen();
                                              setId(row.id_pesan);
                                            }}
                                          >
                                            Hapus
                                          </MenuItem>
                                          <MenuItem onClick={popupState.close}>
                                            <Link
                                              to={`/admin/transaksi/detail/${row.id_pesan}`}
                                            >
                                              Detail
                                            </Link>
                                          </MenuItem>
                                        </Menu>
                                      </React.Fragment>
                                    )}
                                  </PopupState>
                                ) : (
                                  ""
                                )}
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
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Tidak</Button>
            <Button
              onClick={() => {
                deleteData(id);
                handleClose();
              }}
              autoFocus
            >
              Iya
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default Transaksiadmin;
