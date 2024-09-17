const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new asset
router.post('/', async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an asset
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Asset.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAsset = await Asset.findByPk(req.params.id);
      res.status(200).json(updatedAsset);
    } else {
      res.status(404).json({ message: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an asset
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Asset.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
