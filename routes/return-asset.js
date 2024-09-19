const express = require('express');
const router = express.Router();
const { Asset, Employee,AssetHistory } = require('../models');


// Get the return asset form
router.get('/', async (req, res) => {
  try {
    // Fetch assets and employees for the form
    const assets = await Asset.findAll({ where: { status: 'Issued' } });
    const employees = await Employee.findAll();
    // Pass query parameters to Pug template
    res.render('return-asset', { assets, employees, query: req.query || {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post return asset
router.post('/', async (req, res) => {
  try {
    const { assetId,employeeId, reason } = req.body;
    await AssetHistory.create({ assetId, employeeId, reason, date: new Date() });
    res.redirect('/return-asset?success=true');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
