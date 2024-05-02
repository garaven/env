const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'env',
  user: 'root',
  password: ''
});

db.connect(err => {
  if (err) {
    console.error('Error when connecting to database');
  } else {
    console.log('Successful connection')
  }
});

function registerUser(name, email, password, acc_type, country, callback){
  const sql = `INSERT INTO user(name, email, password, acc_type, country, active) VALUES (?, ?, ?, ?, ?, true)`;
  db.query(sql, [name, email, password, acc_type, country], (err, result) =>{
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, result);
  });
}

function loginUser(email, password, callback) {
  const sql = `SELECT * FROM user WHERE email = ?`;
  db.query(sql, [email], (err, result) => {
      if (err) {
          console.error('Error al obtener usuario de la base de datos:', err);
          return callback(err);
      }
      if (result.length === 0) {
          return callback(null, null);
      }
      const user = result[0];
      if (user.password == password) {
        // La contraseña no coincide
        return callback(null, null);
      }
      console.log('Inicio de sesión exitoso. Información del usuario:', user);
      callback(null, user);
  });
}

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

function getDevices(callback) {
  const sql = `SELECT * FROM device`;
  db.query(sql, (err, devices) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, devices);
  });
}

function updateDevice(deviceId, brand, consumption, usage_time, callback) {
  const sql = `UPDATE device SET brand = ?, consumption = ?, usage_time = ? WHERE id = ?`;
  db.query(sql, [brand, consumption, usage_time, deviceId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el dispositivo en la base de datos:', err);
      return callback(err);
    }
    console.log('Dispositivo actualizado en la base de datos:', result);
    callback(null, result);
  });
}

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

function updateDeviceStatus(deviceId, active, callback) {
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
  registerUser,
  loginUser,
  addDevice,
  getDevices,
  updateDevice,
  getActiveDevices,
  updateDeviceStatus
};