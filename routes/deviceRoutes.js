const express = require('express');
const router = express.Router();
const path = require("path");
const control = require('../controllers/deviceController');

// Route to create a new device
router.post("/add", (req, res) => {
  const { name, brand, consumption, usage_time } = req.body;
    control.addDevice(name, brand, consumption, usage_time, (err, result) =>{
      if (err) {
        return res.status(500).send('Error registering device');
      }
      res.sendFile(path.join(__dirname + "/view/src/main.html"))
    });
  });

// Route to show the list of devices
router.get("/device", (req, res) => {
  control.devicesList((err, devices) => {
    if (err) {
      return res.status(500).send('Error fetching devices');
    }
    res.json(devices);
  });
});

// Route to modify information of the device on the list
router.put("/device/:id/edit", (req, res) => {
  const deviceId = req.params.id;
  const { name, brand, consumption, usage_time } = req.body;
  control.editDevice(deviceId, name, brand, consumption, usage_time, (err, result) => {
    if (err) {
      console.error('Error al actualizar el estado del dispositivo:', err);
      return res.status(500).send('Error al actualizar el estado del dispositivo');
    }
    res.status(200).send('Estado del dispositivo actualizado exitosamente');
  });
});

// Route to "delete" device on list
router.put("/device/:id/status", (req, res) => {
  const deviceId = req.params.id;
  const { active } = req.body;
  control.deleteDevice(deviceId, active, (err, result) => {
    if (err) {
      console.error('Error al actualizar el estado del dispositivo:', err);
      return res.status(500).send('Error al actualizar el estado del dispositivo');
    }
    console.log('Estado del dispositivo actualizado:', result);
  });
});

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/add_device.html"))
});

router.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/devices_list.html"))
});

router.get("/edit-form", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/edit_device.html"));
});

router.get("/edit/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/edit_device.html"));
});


module.exports = router;