const express = require('express');
const app = express();
const path = require("path");

app.listen(3000, ()=>{
  console.log("Server running")
})

app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname + "/view/src/index.html"));
})