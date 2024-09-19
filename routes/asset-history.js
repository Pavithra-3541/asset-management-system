const express = require('express');
const router = express.Router();
const { AssetHistory } = require('../models'); // Adjust import based on your model setup

// Get all asset history
router.get('/all-asset-history', async (req, res) => {
  try {
    const histories = await AssetHistory.findAll(); // Fetch all asset history records
    res.render('all-asset-history', { histories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
