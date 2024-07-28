const pool = require('../config/db');

const Clinic = {
  create: async (name, address, latitude, longitude, contact_info, services) => {
    const query = 'INSERT INTO clinics (name, address, latitude, longitude, contact_info, services) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [name, address, latitude, longitude, contact_info, services];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM clinics';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM clinics WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, name, address, latitude, longitude, contact_info, services) => {
    const query = 'UPDATE clinics SET name = $1, address = $2, latitude = $3, longitude = $4, contact_info = $5, services = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *';
    const values = [name, address, latitude, longitude, contact_info, services, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM clinics WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = Clinic;
