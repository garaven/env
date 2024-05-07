const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.listen(3000, ()=>{
  console.log("Server running")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('view'));

app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname + "/view/src/index.html"));
})

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/index.html"))
})

app.get("/forgot", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/forgot_password.html"))
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/about.html"))
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

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/settings.html"))
})

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/dashboard.html"))
})

app.get("/edit-form", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/edit_device.html"));
});

app.get("/edit/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/src/edit_device.html"));
});

app.get('/logout', (req, res) => {
  res.redirect('/');
});

const devicesList = require('./routes/devicesListRoutes')
app.use(devicesList);

const loginRouter = require('./routes/loginRoutes')
app.use(loginRouter);

const registerRouter = require('./routes/registerRoutes')
app.use(registerRouter);

const addDeviceRouter = require('./routes/addDeviceRoutes')
app.use(addDeviceRouter);

const deleteDeviceRouter = require('./routes/deleteDeviceRoutes')
app.use(deleteDeviceRouter);

const editDeviceRouter = require('./routes/editDeviceRoutes')
app.use(editDeviceRouter);