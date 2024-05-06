const express = require('express');
const router = express.Router();
const control = require('../controllers/registerController');

router.post("/register", (req, res) =>{
  const { name, email, password, acc_type, country } = req.body;
  control.registerUser(name, email, password, acc_type, country, (err, result) =>{
    if (err) {
      return res.status(500).send('Error registering user');
    }
    res.send('User registered sucesfully');
  })
})

module.exports = router;