const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// Scrap an asset
router.post('/', async (req, res) => {
  try {
    const { assetId } = req.body;
    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    asset.status = 'Scrapped';
    await asset.save();

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
