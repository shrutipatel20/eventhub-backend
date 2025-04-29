const mysql = require('mysql2');

// Update the host to the correct one
const db = mysql.createConnection({
  host: 'localhost', // This should be the actual host of your database
  user: 'your-database-user', // Your database username
  password: 'your-database-password', // Your database password
  database: 'eventhub', // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database!");
});

module.exports = db;
