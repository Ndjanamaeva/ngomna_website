const { Sequelize, DataTypes } = require('sequelize');

// Set up Sequelize and PostgreSQL
const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

// Define Feature model
const Feature = sequelize.define('Feature', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = { sequelize, Feature };
