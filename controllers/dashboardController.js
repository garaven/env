const { db } = require('../database/db');

function getUsageTotal(callback) {
  const sql = `SELECT consumption, usage_time FROM device WHERE active = 1`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return callback(err);
    }

    let totalUsage = 0;
    results.forEach(device => {
      totalUsage += device.consumption * device.usage_time;
    });
    callback(null, totalUsage);
  });
}

module.exports = {
  getUsageTotal
};
