const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/api/events', async (req, res) => {
  const { title, date, location } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO events (title, date, location) VALUES (?, ?, ?)',
      [title, date, location]
    );
    res.status(201).json({ id: result.insertId, title, date, location });
  } catch (err) {
    console.error("💥 ERROR inserting into DB:", error);
  res.status(500).json({ error: error.message });
  }
});

module.exports = router;
