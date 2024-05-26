const express = require('express');
const router = express.Router();
const path = require("path");
const control = require('../controllers/userController');

// Route to register user on db
router.post("/register", (req, res) =>{
  const { name, email, password, acc_type, country } = req.body;
  control.registerUser(name, email, password, acc_type, country, (err, result) =>{
    if (err) {
      return res.status(500).send('Error registering user');
    }
    res.send('User registered sucesfully');
  })
});

// Route to login user on db
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  control.loginUser(email, password, (err, result) => {
    if(err) {
      return res.status(500).send('Error al intentar iniciar sesión');
    }
    if(result === false) {
      return res.status(404).send('Contraseña incorrecta');
    } else {
      if(result === 'notfound') {
        return res.status(500).send('User not found');
      } else {
        res.redirect(`/main?acc_type=${acc_type}`);
      // res.sendFile(path.join(__dirname + "/../view/src/main.html"));
      }
    }
  })
});

router.get("/user", (req, res) => {
  control.userList((err, user) => {
    if (err) {
      return res.status(500).send('Error fetching devices');
    }
    res.json(user);
  });
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/register.html"))
});

router.get("/forgot", (req, res) => {
  res.sendFile(path.join(__dirname + "/../view/src/forgot_password.html"))
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;