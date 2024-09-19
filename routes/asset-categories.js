const express = require('express');
const router = express.Router();
const { AssetCategory } = require('../models');

// List all asset categories
router.get('/', async (req, res) => {
  try {
    const assetCategories = await AssetCategory.findAll();
    res.render('asset-categories', { assetCategories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Show form to add a new asset category
router.get('/new', (req, res) => {
  res.render('new-asset-category');
});

// Add a new asset category
router.post('/', async (req, res) => {
  try {
    await AssetCategory.create(req.body);
    res.redirect('/asset-categories');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Show form to edit an asset category
router.get('/edit/:id', async (req, res) => {
  try {
    const assetCategory = await AssetCategory.findByPk(req.params.id);
    if (assetCategory) {
      res.render('edit-asset-category', { assetCategory });
    } else {
      res.status(404).send('Asset Category not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an asset category
router.post('/edit/:id', async (req, res) => {
  try {
    const [updated] = await AssetCategory.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      res.redirect('/asset-categories');
    } else {
      res.status(404).send('Asset Category not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an asset category
router.post('/:id/delete', async (req, res) => {
  try {
    const deleted = await AssetCategory.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.redirect('/asset-categories');
    } else {
      res.status(404).send('Asset Category not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
