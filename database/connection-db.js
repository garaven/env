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
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
    if(result.length > 0) {
      console.log('user already created')
    } else {
        const sql = `INSERT INTO user(name, email, password, acc_type, country, active) VALUES (?, ?, ?, ?, ?, true)`;
        db.query(sql, [name, email, password, acc_type, country], (err, result) =>{
          if (err) {
            console.error('Error on database:', err);
            return callback(err);
          }
          callback(null, result);
        });
      }
  }
)}

function loginUser(email, password, callback) {
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
    if(result.length > 0) {
      user = result[0];
      if(user.password === password) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, 'notfound');
    }
  }
)}

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
  registerUser,
  loginUser,
  addDevice,
  getDevices,
  getDevice,
  updateDevice,
  getActiveDevices,
  updateDeviceStatus
};