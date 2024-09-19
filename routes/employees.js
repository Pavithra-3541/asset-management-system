const express = require('express');
const router = express.Router();
const { Employee } = require('../models');

// Get all employees and render the view
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.render('employees', { employees });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

// Render add employee form
router.get('/add', (req, res) => {
  res.render('add-employee'); 
});

// Add a new employee
router.post('/', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.redirect('/employees'); 
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Render edit employee form
router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.render('edit-employee', { employee });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/edit/:id', async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      res.redirect('/employees');
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Edit an employee
router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.render('edit-employee', { employee });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee
router.post('/delete/:id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.redirect('/employees');
    } else {
      res.status(404).render('error', { error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

module.exports = router;
