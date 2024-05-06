const { db } = require('../database/db');

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

module.exports = {
  registerUser
};