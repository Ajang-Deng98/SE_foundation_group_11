const pool = require('../config/db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const Appointment = {
  create: async (user_id, clinic_id, date, time, status = 'pending') => {
    const query = 'INSERT INTO appointments (user_id, clinic_id, date, time, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [user_id, clinic_id, date, time, status];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM appointments';
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM appointments WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  updateStatus: async (id, status) => {
    const query = 'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *';
    const values = [status, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  sendEmailConfirmation: async (appointment, email) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Your appointment is scheduled for ${appointment.date} at ${appointment.time}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email sending error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
};

module.exports = Appointment;
