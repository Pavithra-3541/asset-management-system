const express = require('express');
const router = express.Router();
const { Asset, Employee, AssetCategory } = require('../models');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll({
      include: [Employee, AssetCategory]
    });
    res.render('assets', { assets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets); // Send JSON data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch available assets
router.get('/assets', async (req, res) => {
  try {
    const assets = await Asset.findAll({ where: { status: 'Available' } });
    res.json(assets);  // Send the assets as JSON
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);  // Send the employees as JSON
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Render form to add a new asset
router.get('/add', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const assetCategories = await AssetCategory.findAll();
    res.render('add-asset', { employees, assetCategories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Add a new asset
router.post('/', async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.redirect('/assets');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Render form to edit an asset
router.get('/edit/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id, {
      include: [Employee, AssetCategory]
    });
    const employees = await Employee.findAll();
    const assetCategories = await AssetCategory.findAll();
    if (asset) {
      res.render('edit-asset', { asset, employees, assetCategories });
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an asset
router.post('/edit/:id', async (req, res) => {
  try {
    const [updated] = await Asset.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      res.redirect('/assets');
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an asset
router.get('/delete/:id', async (req, res) => {
  try {
    const deleted = await Asset.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.redirect('/assets');
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
