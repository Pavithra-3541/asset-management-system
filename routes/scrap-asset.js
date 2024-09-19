const express = require('express');
const router = express.Router();
const { Asset,AssetHistory } = require('../models');

router.get('/', async (req, res) => {
  try {

    const assets = await Asset.findAll({ where: { status: 'Available' } });
    res.render('scrap-asset', { assets, query: req.query });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { assetId, reason } = req.body;
    await AssetHistory.create({ assetId,reason, date: new Date() });

    res.redirect('/scrap-asset?success=true');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
