const express = require('express');
const router = express.Router();
const control = require('../controllers/deleteDeviceController');

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

module.exports = router;
