// config/db.js
const mysql = require('mysql2/promise'); // Use promise-based client

const db = mysql.createPool({
  host: 'localhost',            // ✅ or your remote DB host
  user: 'root',                 // ✅ your MySQL username
  password: '',                 // ✅ your MySQL password
  database: 'eventhub',         // ✅ your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
