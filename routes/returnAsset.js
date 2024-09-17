const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// Return an asset
router.post('/', async (req, res) => {
  try {
    const { assetId, reason } = req.body;
    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    asset.status = 'In Stock';
    asset.assignedEmployeeId = null;
    await asset.save();

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
