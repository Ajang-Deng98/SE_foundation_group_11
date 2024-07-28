const express = require('express');
const FAQ = require('../models/faq');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.getAll();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { question, answer } = req.body;
  try {
    const faq = await FAQ.create(question, answer);
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.getById(req.params.id);
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { question, answer } = req.body;
  try {
    const faq = await FAQ.update(req.params.id, question, answer);
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const faq = await FAQ.delete(req.params.id);
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
