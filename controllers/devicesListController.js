const { db } = require('../database/db');


function devicesList(callback) {
  const sql = `SELECT * FROM device`;
  db.query(sql, (err, devices) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, devices);
  });
}

module.exports = {
  devicesList
};