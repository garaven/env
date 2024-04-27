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

module.exports = {
  registerUser
};