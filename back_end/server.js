const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/Database');
const featureRoutes = require('./Routes/feature_routes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/features', featureRoutes);

// Sync models
sequelize.sync();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
