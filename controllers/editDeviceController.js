const { db } = require('../database/db');


function editDevice(deviceId, name, brand, consumption, usage_time, callback) {
  const sql = `UPDATE device SET name = ?, brand = ?, consumption = ?, usage_time = ? WHERE id = ?`;
  db.query(sql, [name, brand, consumption, usage_time, deviceId], (err, result) => {
    if (err) {
      console.error('Error updating device status:', err);
      return callback(err);
    }
    console.log('Device status updated successfully:', result);
    callback(null, result);
  });
}

module.exports = {
  editDevice
};