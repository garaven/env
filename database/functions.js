
function getActiveDevices(callback) {
  const sql = `SELECT * FROM device WHERE active = 1`;
  db.query(sql, (err, devices) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, devices);
  });
}

function getDevice(deviceId, callback) {
  const sql = `SELECT * FROM device WHERE id = ?`;
  db.query(sql, [deviceId], (err, device) => {
    if (err) {
      console.error('Error fetching device from database:', err);
      return callback(err);
    }
    callback(null, device[0]);
  });
}

function updateDevice(deviceId, name, brand, consumption, usage_time, callback) {
  const sql = `UPDATE device SET name = ?, brand = ?, consumption = ?, usage_time = ? WHERE id = ?`;
  db.query(sql, [name, brand, consumption, usage_time, deviceId], (err, result) => {
    if (err) {
      console.error('Error updating device in database:', err);
      return callback(err);
    }
    callback(null, result);
  });
}


module.exports = {
  getDevice,
  updateDevice,
  getActiveDevices
};