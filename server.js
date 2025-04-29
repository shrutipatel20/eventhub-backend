const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventsRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // Enable parsing of JSON in requests

app.use('/api/users', userRoutes);  // Use user route for "/api/users"
app.use('/api/events', eventRoutes);  // Use event route for "/api/events"
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
