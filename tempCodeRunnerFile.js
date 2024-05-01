app.put("/edit", (req, res) => {
  const { name, brand, consumption, usage_time } = req.body;
    db.updateDevice(name, brand, consumption, usage_time, (err, result) =>{
      if (err) {
        console.error('Error al actualizar el dispositivo en la base de datos:', err);
        return res.status(500).send('Error al actualizar el dispositivo');
      }
      console.log('Dispositivo actualizado en la base de datos:', result);
    })
  })