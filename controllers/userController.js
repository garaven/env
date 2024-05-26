const { db } = require('../database/db');

function userList(callback) {
  const sql = `SELECT * FROM user`;
  db.query(sql, (err, user) => {
    if (err) {
      console.error('Error on database:', err);
      return callback(err);
    }
    callback(null, user);
  });
};

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
)};

function loginUser(email, password, callback) {
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
    if(result.length > 0) {
      user = result[0];
      acc_type = user.acc_type;
      if(user.password === password) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, 'notfound');
    }
  }
)};

module.exports = {
  registerUser,
  loginUser,
  userList
};