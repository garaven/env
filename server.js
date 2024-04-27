const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser")
const db = require('./database/connection-db');

app.listen(3000, ()=>{
  console.log("Server running")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname + "/view/src/index.html"));
})

app.post("/index", (req, res) =>{
  const { name, email, password, acc_type, country } = req.body;
  db.registerUser(name, email, password, acc_type, country, (err, result) =>{
    if (err) {
      return res.status(500).send('Error registering user');
    }
    res.send('User registered sucesfully');
  })
})