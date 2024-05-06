const express = require('express');
const router = express.Router();
const path = require("path");
const control = require('../controllers/addDeviceController');

router.post("/add", (req, res) => {
  const { name, brand, consumption, usage_time } = req.body;
    control.addDevice(name, brand, consumption, usage_time, (err, result) =>{
      if (err) {
        return res.status(500).send('Error registering device');
      }
      res.sendFile(path.join(__dirname + "/view/src/main.html"))
    })
  })

module.exports = router;