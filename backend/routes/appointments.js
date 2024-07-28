const express = require('express');
const Appointment = require('../models/appointment');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.getAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { clinic_id, date, time } = req.body;
  try {
    const appointment = await Appointment.create(req.user.id, clinic_id, date, time);
    await Appointment.sendEmailConfirmation(appointment, req.user.email);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.getById(req.params.id);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.updateStatus(req.params.id, status);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.delete(req.params.id);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
