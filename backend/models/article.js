const pool = require('../config/db');

const Article = {
  create: async (title, content, author_id) => {
    const query = 'INSERT INTO articles (title, content, author_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, content, author_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM articles';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM articles WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, title, content) => {
    const query = 'UPDATE articles SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *';
    const values = [title, content, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM articles WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = Article;
