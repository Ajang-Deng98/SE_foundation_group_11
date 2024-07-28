const express = require('express');
const Article = require('../models/article');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await Article.getAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article.create(title, content, req.user.id);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.getById(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article.update(req.params.id, title, content);
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const article = await Article.delete(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
