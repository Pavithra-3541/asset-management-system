const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// Get asset history
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Assuming asset history is stored in a history table or can be fetched from logs
    // Example: Fetching from a hypothetical `AssetHistory` model
    // const history = await AssetHistory.findAll({ where: { assetId: asset.id } });

    res.json({
      asset,
      // history
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
