const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const Joi = require("joi");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path')

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
    kategoriBarang: Joi.string().required()
  });
  let result = schema.validate(req.body);
  // let finalImageURL = req.protocol +"://" + req.get("host") + "/uploads/" +req.file.filename;
  // res.send({ message:"success",image: finalImageURL })
  if (result.error) {
    res.status(400).send(result.error.details[0].path[0]+" tidak boleh kosong");
    return;
  }
  const namaBarang = req.body.namaBarang;
  const deskBarang = req.body.deskBarang;
  const harga = req.body.harga;
  const kategoriBarang = req.body.kategoriBarang;
  const gambar = req.file.filename;
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
