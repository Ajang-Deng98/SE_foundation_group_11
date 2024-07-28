const express = require('express');
const Clinic = require('../models/clinic');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const clinics = await Clinic.getAll();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { name, address, latitude, longitude, contact_info, services } = req.body;
  try {
    const clinic = await Clinic.create(name, address, latitude, longitude, contact_info, services);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const clinic = await Clinic.getById(req.params.id);
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { name, address, latitude, longitude, contact_info, services } = req.body;
  try {
    const clinic = await Clinic.update(req.params.id, name, address, latitude, longitude, contact_info, services);
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const clinic = await Clinic.delete(req.params.id);
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
