const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const Joi = require("joi");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
const { send } = require("process");

const message = (str) => {
  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
  let result = [];
  let myStr = str.split('');
  let length = myStr.length;
  let a = null;
  myStr[0] = myStr[0].toUpperCase()
  for (let i = 0;i < length;i++){
    a = str.charCodeAt(i)
    if (a >= 65 &&  a <= 90){
      myStr[i] = myStr[i].toLowerCase();
      result = insert(myStr, i, " ")
    }
  }
  return result.join("")
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello worrld");
});


app.get("/api/barang", (req, res) => {
  let sqlQuery = 'SELECT * FROM barang'
  db.query(sqlQuery, ((err, result) => {
    if (err){
      console.log(err)
    }else{
      res.send(result)
    }
  }))
})

app.get("/api/barang/:id_barang", (req, res) => {
  let id = req.params.id_barang;
  let sqlQuery = "SELECT * FROM barang WHERE id_barang = ?";
  db.query(sqlQuery, id, (err, result) => {
    if (err) {
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

app.get("/api/transaksi", (req, res) => {
  let sqlQuery = "SELECT pesan.id_pesan, pesan.jumlah, pesan.nama_depan, pesan.nama_belakang,alamat, catatan,no_telp, barang.nama_barang FROM pesan INNER JOIN barang on pesan.id_barang = barang.id_barang";
  db.query(sqlQuery, (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.get("/api/transaksi/:id_pesan", (req, res) => {
  let id = req.params.id_pesan;
  let sqlQuery = `SELECT pesan.id_pesan, pesan.nama_depan, pesan.nama_belakang,pesan.alamat, pesan.catatan, pesan.no_telp, barang.nama_barang FROM pesan INNER JOIN barang on pesan.id_barang = barang.id_barang WHERE id_pesan = ${id}`;
  db.query(sqlQuery, (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.delete("/api/delete/:id_barang", (req, res) => {
   let id = req.params.id_barang;
   let query = `DELETE FROM barang WHERE barang.id_barang = ${id}`
   db.query(query, (err, result) => {
     if (err) {
       console.log(err)
     }else{
       res.send(result);
     }
   })
}) 

app.delete("/api/pesan/:id_pesan", (req, res) => {
  let id = req.params.id_pesan;
  let query = `DELETE FROM pesan WHERE id_pesan = ${id}`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
    }else{
      res.send(result);
    }
  })
}) 

app.put("/api/update/:id_barang", (req, res) => {
  let id = req.params.id_barang;
  let namaBarang = req.body.nama_barang;
  let deskripsiBarang = req.body.deskripsi_barang;
  let hargaBarang = req.body.harga_barang;
  let stokBarang = req.body.stok_barang;
  let kategoriBarang = req.body.kategori_barang;
  let gambarBarang = req.body.gambar_barang;

  let query  = `UPDATE barang SET nama_barang = ?, deskripsi_barang = ?, harga_barang = ?, stok_barang = ?, kategori_barang = ? WHERE barang.id_barang = ${id} `
  db.query(query, [namaBarang, deskripsiBarang, hargaBarang, stokBarang, kategoriBarang], (err, result) => {
    if (err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

app.post("/login", (req, res) => {
  const schema = Joi.object({
    username: Joi.required(),
    password: Joi.required(),
  });
  const username = req.body.username;
  const password = req.body.username;
  const test = schema.validate(req.body);
  if (test.error) {
    res.status(400).send(test.error.message);
    return;
  }
  const sqlInsert = `SELECT * FROM admin WHERE username = ?`;
  db.query(sqlInsert, username, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(403).send({ message: "Gaga login" });
    }
  });
});

app.get("/admin", (req, res) => {
  let query = "SELECT * FROM admin";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/inputBarang",upload.single("gambar"), (req, res) => {
  const schema = Joi.object({
    namaBarang: Joi.string().required(),
    deskBarang: Joi.string().required(),
    harga: Joi.string().required(),
    kategoriBarang: Joi.string().required(),
  });
  let result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(message(result.error.details[0].path[0])+" tidak boleh kosong");
    return;
  }
  let finalImageURL = req.protocol +"://" + req.get("host") + "/uploads/" +req.file.filename;
  const namaBarang = req.body.namaBarang;
  const deskBarang = req.body.deskBarang;
  const harga = req.body.harga;
  const kategoriBarang = req.body.kategoriBarang;
  const gambar =finalImageURL;
  const sqlQuery =
    "INSERT INTO `barang` (`id_barang`, `nama_barang`, `deskripsi_barang`, `harga_barang`, `stok_barang`, `kategori_barang`, `gambar_barang`) VALUES (NULL, ?, ?, ?, '', ?,?)";
  db.query(
    sqlQuery,
    [namaBarang, deskBarang, harga, kategoriBarang, gambar],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/api/pesan/:idBarang", (req, res) => {
  const schema = Joi.object({
    namaDepan: Joi.string().required(),
    namaBelakang: Joi.string().required(),
    no_telp : Joi.string().required(),
    alamat :Joi.string().required(),
    catatan : Joi.string().required(),
    jumlah : Joi.number().required()
  })
  let result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].path[0] + " tidak boleh kosong")
    return;
  };
  const namaDepan = req.body.namaDepan;
  const namaBelakang = req.body.namaBelakang;
  const no_telp = req.body.no_telp;
  const alamat = req.body.alamat;
  const catatan = req.body.catatan;
  const idBarang = req.params.idBarang;
  const jumlah = req.body.jumlah
  let sqlQuery = "INSERT INTO `pesan` (`id_pesan`,`jumlah`,`nama_depan`, `nama_belakang`, `alamat`, `catatan`, `no_telp`, `id_barang`) VALUES ('',?, ?, ?, ?, ?, ?, ?) "
  db.query(sqlQuery, [jumlah, namaDepan, namaBelakang, alamat, catatan, no_telp,idBarang],(err, result) => {
    if (err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

app.delete("api/delete/:id", (req, res) => {
  let id = req.params.id;
  let sqlQuery = "DELETE FROM `barang` WHERE `barang`.`id_barang` = ?"
  db.query(sqlQuery, id, (err, result) => {
    if (err){
      console.log(err)
    }else {
      res.send(result)
    }
  })
})

app.post("/transaksi/:barang/:pembeli", (req, res) => {
  let barang = req.params.barang;
  let pembeli = req.params.pembeli;
  const query =
    "INSERT INTO `transaksi` (`id_transaksi`, `id_barang`, `id_pembeli`, `total_harga`) VALUES (NULL, ?, ?, ?); ";
  db.query(query, [barang, pembeli], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/transaksi/:id_transaksi", (req, res) => {
  let transaksi = req.params.id_transaksi;
  const query =
    "SELECT  transaksi.id_transaksi, pembeli.nama_pembeli, barang.nama_barang, transaksi.total_harga FROM pembeli, transaksi, barang WHERE transaksi.id_transaksi = ? AND pembeli.id_pembeli = transaksi.id_pembeli AND barang.id_barang = transaksi.id_barang;";
  db.query(query, [transaksi], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (!result) {
        res.send("Transaksi tidak ditemukan");
      } else {
        res.send(result);
      }
    }
  });
});

app.listen(3005, () => {
  console.log("server running on port 3005");
});
