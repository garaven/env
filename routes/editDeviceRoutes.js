const express = require('express');
const router = express.Router();
const control = require('../controllers/editDeviceController');

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

module.exports = router;
