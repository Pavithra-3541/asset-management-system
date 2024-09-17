const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// Get stock view
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll({ where: { status: 'In Stock' } });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
