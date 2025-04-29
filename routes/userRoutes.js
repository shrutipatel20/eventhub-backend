const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST request to add a new user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Insert user into database
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

module.exports = router;
