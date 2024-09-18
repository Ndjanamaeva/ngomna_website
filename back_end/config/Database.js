const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

const Menu = sequelize.define('Menu', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

const Page = sequelize.define('Page', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

const MenuItem = sequelize.define('MenuItem', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Menu.hasMany(MenuItem, {
  foreignKey: 'menuId',
  as: 'menuItems',
  onDelete: 'CASCADE'
});
MenuItem.belongsTo(Menu, {
  foreignKey: 'menuId',
  as: 'menu'
});

MenuItem.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});
Page.hasMany(MenuItem, {
  foreignKey: 'pageId',
  as: 'menuItems'
});

sequelize.sync({ force: true }) // Use { alter: true } to update existing tables
  .then(async () => {
    console.log('Database & tables created!');
    // Insert sample data if needed
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = { sequelize, Menu, MenuItem, Page };
