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