// Import dependencies
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// CORS settings to allow only your frontend domain
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Allow only this domain
  methods: ['GET', 'POST'], // Allow only GET and POST methods (optional)
  allowedHeaders: ['Content-Type'], // Allow only specific headers
};

// Use CORS middleware with the above options
app.use(cors(corsOptions));

// Parse incoming JSON data (for POST requests)
app.use(bodyParser.json());

// Database connection (make sure to adjust your credentials)
const db = mysql.createConnection({
  host: 'your-database-host',
  user: 'your-database-user',
  password: 'your-database-password',
  database: 'eventhub', // Your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Example API endpoint for creating events
app.post('/api/events', async (req, res) => {
  const { title, date, location } = req.body;

  try {
    const query = 'INSERT INTO events (title, date, location) VALUES (?, ?, ?)';
    db.query(query, [title, date, location], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: result.insertId,
        title,
        date,
        location,
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
