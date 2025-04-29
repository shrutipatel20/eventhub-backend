const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json());

const eventsRoutes = require('./routes/eventsRoutes');
app.use('/api/events', eventsRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
