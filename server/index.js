const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const Joi = require("joi");
const bodyParser = require("body-parser")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop",
  })

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.send("Hello worrld")
})

app.post("/login", (req, res) => {
    const schema = Joi.object({
        "username" :Joi.required(),
        "password" :Joi.required()
    });
    const username = req.body.username;
    const password = req.body.username;
    const test = schema.validate(req.body);
    if (test.error){
        res.status(400).send(test.error.message);
        return;
    }
    const sqlInsert = `SELECT * FROM admin WHERE username = ?`
    db.query(sqlInsert, username, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length > 0){
            res.send(result)
        }else{
            res.status(403).send({message:"Gaga login"})
        }
    })
})

app.get("/admin", (req, res) => {
    let query = "SELECT * FROM admin";
    db.query(query, (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3005, ()=>{
    console.log("server running on port 3005")
})