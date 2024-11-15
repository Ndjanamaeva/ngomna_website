const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/routes');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend interaction
app.use(express.json()); // Parse incoming JSON requests

// Use routes for menu items
app.use(menuRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
