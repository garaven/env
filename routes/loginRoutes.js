const express = require('express');
const router = express.Router();
const path = require("path");
const control = require('../controllers/loginController');

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
      res.sendFile(path.join(__dirname + "/../view/src/main.html"));
      }
    }
  })
})

module.exports = router;