const express = require('express');
const router = express.Router();
const { Asset, Employee } = require('../models');

// Issue an asset
router.post('/', async (req, res) => {
  try {
    const { assetId, employeeId } = req.body;
    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    asset.status = 'Issued';
    asset.assignedEmployeeId = employeeId;
    await asset.save();

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
