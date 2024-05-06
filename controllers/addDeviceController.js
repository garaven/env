const { db } = require('../database/db');


function addDevice(name, brand, consumption, usage_time, callback) {
  const sql = `INSERT INTO device(name, brand, consumption, usage_time, date, active) VALUES (?, ?, ?, ?, NOW(), ?)`;
  db.query(sql, [name, brand, consumption, usage_time, 1], (err, result) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, result);
    });
}

module.exports = {
  addDevice
};