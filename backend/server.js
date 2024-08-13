//server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set up Sequelize and PostgreSQL
const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

const Feature = sequelize.define('Feature', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Sync models
sequelize.sync();

// API Routes
app.get('/features', async (req, res) => {
  const features = await Feature.findAll();
  res.json(features.map(feature => feature.name));
});

app.post('/features', async (req, res) => {
  const { name } = req.body;
  try {
    const feature = await Feature.create({ name });
    res.json(feature.name);
  } catch (error) {
    res.status(400).json({ error: 'Feature already exists' });
  }
});

app.put('/features/:index', async (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  try {
    const feature = await Feature.findOne({ where: { name: index } });
    if (feature) {
      feature.name = name;
      await feature.save();
      res.json(feature.name);
    } else {
      res.status(404).json({ error: 'Feature not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

app.delete('/features/:index', async (req, res) => {
  const { index } = req.params;
  try {
    const feature = await Feature.findOne({ where: { name: index } });
    if (feature) {
      await feature.destroy();
      res.json({ message: 'Feature deleted' });
    } else {
      res.status(404).json({ error: 'Feature not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Deletion failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
