const express = require('express');
const router = express.Router();
const control = require('../controllers/dashboardController');

router.get('/dashboard/usage_time', (req, res) => {
  control.getUsageTotal((err, totalUsage) => {
    if (err) {
      return res.status(500).send('Error getting total usage');
    }
    res.json({ totalUsage });
  });
});

module.exports = router;
