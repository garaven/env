const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard/usage_time', (req, res) => {
  dashboardController.getUsageTotal((err, totalUsage) => {
    if (err) {
      return res.status(500).send('Error getting total usage');
    }
    res.json({ totalUsage });
  });
});

module.exports = router;
