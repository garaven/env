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
      if (user.password !== password) {
        // La contraseña no coincide
        return callback(null, null);
      }
      console.log('Inicio de sesión exitoso. Información del usuario:', user);
      callback(null, user);
  });
}

module.exports = {
  registerUser,
  loginUser
};