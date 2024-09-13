const { Sequelize, DataTypes } = require('sequelize');

// Set up Sequelize and PostgreSQL
const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

// Define the Menu model (menu table)
const Menu = sequelize.define('Menu', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Define the MenuItem model (menu_item table)
const MenuItem = sequelize.define('MenuItem', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define the one-to-many relationship between Menu and MenuItem
Menu.hasMany(MenuItem, {
  foreignKey: 'menuId',
  as: 'menuItems', // Alias for the related items
  onDelete: 'CASCADE', // Delete related menu items when a menu is deleted
});
MenuItem.belongsTo(Menu, {
  foreignKey: 'menuId',
  as: 'menu', // Alias for the related menu
});

// Sync the models with the database and insert sample data
sequelize.sync({ force: true }) // This will recreate the tables, use { alter: true } to update existing ones
  .then(async () => {
    console.log('Database & tables created!');

    // Create a menu called 'features' with several menu items
    const featuresMenu = await Menu.create({
      title: 'features',
      menuItems: [
        { label: 'payslips' },
        { label: 'information' },
        { label: 'notifications' },
        { label: 'census' },
        { label: 'messaging' },
        { label: 'children' },
        { label: 'security' },
        { label: 'OTP' },
        { label: 'DGI' }
      ]
    }, {
      include: [{ model: MenuItem, as: 'menuItems' }] // Include associated MenuItems
    });

    console.log('Menu with menu items created:', featuresMenu.toJSON());
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = { sequelize, Menu, MenuItem };
