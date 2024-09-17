const express = require('express');
const router = express.Router();
const { Employee } = require('../models');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an employee
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
