const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.static('public'))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello worrld")
})

app.listen(3000, ()=>{
    console.log("server running on port 3000")
})