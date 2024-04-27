const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'env',
  user: 'root',
  password: ''
});

connection.connect(err => {
  if (err) {
    console.error('Error when connecting to database');
  } else {
    console.log('Successful connection')
  }
});


function createUser() {

}

function readUser() {

} 

function updateUser() {

}

function deleteUser() {

}


module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser
}