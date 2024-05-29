const { db } = require('../database/db');

function devicesListByUser(user_email, callback) {
  const sql = `SELECT * FROM device WHERE user_email = ? AND active = 1`;
  db.query(sql, [user_email], (err, devices) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, devices);
  });
}

function devicesList(callback) {
  const sql = `SELECT * FROM device`;
  db.query(sql, (err, devices) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, devices);
  });
};

function addDevice(user_email, name, brand, consumption, usage_time, callback) {
  const sql = `INSERT INTO device(user_email, name, brand, consumption, usage_time, date, active) VALUES (?, ?, ?, ?, ?, NOW(), ?)`;
  db.query(sql, [user_email, name, brand, consumption, usage_time, 1], (err, result) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, result);
    });
};

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
};

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
};

module.exports = {
  devicesListByUser,
  devicesList,
  editDevice,
  deleteDevice,
  addDevice
};