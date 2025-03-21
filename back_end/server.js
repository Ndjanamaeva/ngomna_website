//server.js

const express = require('express');
const cors = require('cors');
const menuRoutes = require('./Routes/routes');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend interaction
app.use(express.json()); // Parse incoming JSON requests

// Use routes
app.use(menuRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
