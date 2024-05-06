const { db } = require('../database/db');


function deleteDevice(deviceId, active, callback) {
  const sql = `UPDATE device SET active = ? WHERE id = ?`;
  db.query(sql, [active, deviceId], (err, result) => {
    if (err) {
      console.error('Error updating device status:', err);
      return callback(err);
    }
    console.log('Device status updated successfully:', result);
    callback(null, result);
  });
}

module.exports = {
  deleteDevice
};