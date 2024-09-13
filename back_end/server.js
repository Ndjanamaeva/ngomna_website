const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/Database');
const featureRoutes = require('./Routes/feature_routes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/menus', featureRoutes);

// Sync models with the database
sequelize.sync({ force: true }) // Use `{ alter: true }` for production
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
