const { db } = require('../database/db');
const userConfig = require('./userConfig')

function getUsageTotal(callback) {
  const user_email = userConfig.getUserEmail();
  const sql = `SELECT consumption, usage_time FROM device WHERE active = 1 AND user_email = ?`;
  db.query(sql, [user_email], (err, results) => {
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
