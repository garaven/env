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
app.use(express.static(path.join(__dirname, 'view/css')));

app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname + "/view/src/index.html"));
})

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/index.html"))
})

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/main.html"))
})

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/register.html"))
})

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/add_device.html"))
})

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/devices_list.html"))
})

app.get("/device", (req, res) => {
  db.getDevices((err, devices) => {
    if (err) {
      return res.status(500).send('Error fetching devices');
    }
    res.json(devices);
  });
});

// Controller/LoginControl
app.post("/main", (req, res) => {
  const { email, password } = req.body;
  db.loginUser(email, password, (err, result) => {
    if (err) {
      return res.status(500).send('User not found')
    }
    res.sendFile(path.join(__dirname + "/view/src/main.html"));
  })
})

// Controller/RegisterControl
app.post("/register", (req, res) =>{
  const { name, email, password, acc_type, country } = req.body;
  db.registerUser(name, email, password, acc_type, country, (err, result) =>{
    if (err) {
      return res.status(500).send('Error registering user');
    }
    res.send('User registered sucesfully');
  })
})

// Controller/AddControl
app.post("/add", (req, res) => {
  const { name, brand, consumption, usage_time } = req.body;
    db.addDevice(name, brand, consumption, usage_time, (err, result) =>{
      if (err) {
        return res.status(500).send('Error registering device');
      }
      res.send('Device registered sucesfully');
    })
  })