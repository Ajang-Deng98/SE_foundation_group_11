const pool = require('../config/db');

const FAQ = {
  create: async (question, answer) => {
    const query = 'INSERT INTO faqs (question, answer) VALUES ($1, $2) RETURNING *';
    const values = [question, answer];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM faqs';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM faqs WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, question, answer) => {
    const query = 'UPDATE faqs SET question = $1, answer = $2 WHERE id = $3 RETURNING *';
    const values = [question, answer, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM faqs WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = FAQ;
