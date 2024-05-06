const express = require('express');
const router = express.Router();
const control = require('../controllers/devicesListController');

router.get("/device", (req, res) => {
  control.devicesList((err, devices) => {
    if (err) {
      return res.status(500).send('Error fetching devices');
    }
    res.json(devices);
  });
});

module.exports = router;