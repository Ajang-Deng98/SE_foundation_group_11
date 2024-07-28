const express = require('express');
const Clinic = require('../models/clinic');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Fetch clinics from Google Places API
router.get('/real-time', async (req, res) => {
  const { state, city } = req.query;
  try {
    // Fetch clinics from Google Places API
    const clinics = await Clinic.fetchFromGooglePlaces(state, city);
    res.json(clinics);
  } catch (err) {
    console.error('Error fetching real-time clinics:', err);  // Log the error
    res.status(500).json({ error: 'Failed to fetch real-time clinics' });
  }
});

// Get all clinics or filter by state and city
router.get('/', async (req, res) => {
  const { state, city } = req.query;
  try {
    let clinics;
    if (state && city) {
      clinics = await Clinic.getByStateAndCity(state, city);
    } else if (state) {
      clinics = await Clinic.getByState(state);
    } else {
      clinics = await Clinic.getAll();
    }
    res.json(clinics);
  } catch (err) {
    console.error('Error fetching clinics:', err);  // Log the error
    res.status(500).json({ error: 'Failed to fetch clinics' });
  }
});

// Create a new clinic
router.post('/', authenticateToken, async (req, res) => {
  const { name, address, latitude, longitude, contact_info, services, state, city } = req.body;
  try {
    const clinic = await Clinic.create(name, address, latitude, longitude, contact_info, services, state, city);
    res.status(201).json(clinic);
  } catch (err) {
    console.error('Error creating clinic:', err);  // Log the error
    res.status(500).json({ error: 'Failed to create clinic' });
  }
});

// Get a single clinic by ID
router.get('/:id', async (req, res) => {
  try {
    const clinic = await Clinic.getById(req.params.id);
    res.json(clinic);
  } catch (err) {
    console.error('Error fetching clinic by ID:', err);  // Log the error
    res.status(500).json({ error: 'Failed to fetch clinic' });
  }
});

// Update a clinic by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, address, latitude, longitude, contact_info, services, state, city } = req.body;
  try {
    const clinic = await Clinic.update(req.params.id, name, address, latitude, longitude, contact_info, services, state, city);
    res.json(clinic);
  } catch (err) {
    console.error('Error updating clinic:', err);  // Log the error
    res.status(500).json({ error: 'Failed to update clinic' });
  }
});

// Delete a clinic by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const clinic = await Clinic.delete(req.params.id);
    res.json(clinic);
  } catch (err) {
    console.error('Error deleting clinic:', err);  // Log the error
    res.status(500).json({ error: 'Failed to delete clinic' });
  }
});

module.exports = router;
