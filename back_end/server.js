const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/Database');
const featureRoutes = require('./Routes/routes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/menus', featureRoutes);  // Route for menu-related actions
app.use('/pages', featureRoutes);  // Route for page-related actions

// Sync models with the database (altering tables to match models without data loss)
sequelize.sync({ alter: true }) // Use `{ alter: true }` for non-destructive sync
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
