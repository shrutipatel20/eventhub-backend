const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Make sure your db connection is properly set up

// Route to fetch all events
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to create a new event
router.post('/', async (req, res) => {
  const { title, date, location } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO events (title, date, location) VALUES (?, ?, ?)',
      [title, date, location]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      date,
      location
    });
  } catch (error) {
    console.error("💥 ERROR inserting into DB:", error);
    
  }
});

module.exports = router;
