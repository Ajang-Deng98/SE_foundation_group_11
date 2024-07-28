const axios = require('axios');
const pool = require('../config/db');

const db = pool;

class Clinic {
  static async getAll() {
    try {
      const result = await db.query('SELECT * FROM clinics');
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching clinics');
    }
  }

  static async getByState(state) {
    try {
      const result = await db.query('SELECT * FROM clinics WHERE state = $1', [state]);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching clinics by state');
    }
  }

  static async getByStateAndCity(state, city) {
    try {
      const result = await db.query('SELECT * FROM clinics WHERE state = $1 AND city = $2', [state, city]);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching clinics by state and city');
    }
  }

  static async create(name, address, latitude, longitude, contact_info, services, state, city) {
    try {
      const result = await db.query(
        'INSERT INTO clinics (name, address, latitude, longitude, contact_info, services, state, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [name, address, latitude, longitude, contact_info, services, state, city]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error creating clinic');
    }
  }

  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM clinics WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error fetching clinic by ID');
    }
  }

  static async update(id, name, address, latitude, longitude, contact_info, services, state, city) {
    try {
      const result = await db.query(
        'UPDATE clinics SET name = $1, address = $2, latitude = $3, longitude = $4, contact_info = $5, services = $6, state = $7, city = $8 WHERE id = $9 RETURNING *',
        [name, address, latitude, longitude, contact_info, services, state, city, id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error updating clinic');
    }
  }

  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM clinics WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error deleting clinic');
    }
  }


  static async fetchFromGooglePlaces(state, city) {
    try {
      const apiKey = 'AIzaSyBfW6paJ1iKUlj_6mxESfnsUJ3UUKTClWk';
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: `clinics in ${city}, ${state}`,
          key: apiKey
      }
    });
    return response.data.results;
  } catch (err) {
    throw new Error('Error fetching clinics from Google Places API: ' + err.message);
  }
}

// method to save fetched clinics 
static async saveFetchedClinics(clinics) {
  try {
    const results = [];
    for (const clinic of clinics) {
      const result = await db.query(
        'INSERT INTO clinics (name, address, latitude, longitude, contact_info, services, state, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [clinic.name, clinic.formatted_address, clinic.geometry.location.lat, clinic.geometry.location.lng, '', '', '', '']
      );
      results.push(result.rows[0]);
    }
    return results;
  } catch (err) {
    throw new Error('Error saving fetched clinics: ' + err.message);
  }
}
}


module.exports = Clinic;
