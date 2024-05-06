const { db } = require('../database/db');

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

module.exports = {
  loginUser
};