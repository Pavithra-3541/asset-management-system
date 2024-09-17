const express = require('express');
const router = express.Router();
const { AssetCategory } = require('../models');

// Get all asset categories
router.get('/', async (req, res) => {
  try {
    const categories = await AssetCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new asset category
router.post('/', async (req, res) => {
  try {
    const category = await AssetCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an asset category
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await AssetCategory.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCategory = await AssetCategory.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Asset Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an asset category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await AssetCategory.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Asset Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
