const express = require('express');
const router = express.Router();
const path = require("path");


router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/index.html"));
});

router.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/index.html"))
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/about.html"))
});

router.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/main.html"))
});

router.get("/analytics", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/analytics.html"))
});

router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/settings.html"))
});

router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/dashboard.html"))
});

module.exports = router;