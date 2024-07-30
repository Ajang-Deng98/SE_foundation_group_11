const express = require('express');
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


module.exports = router;
