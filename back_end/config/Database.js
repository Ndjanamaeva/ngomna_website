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

// Define the Page model (page table) with removed text and image fields
const Page = sequelize.define('Page', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
  // Removed text and image fields
});

// Define the MenuItem model (menu_item table) with removed link field
const MenuItem = sequelize.define('MenuItem', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // Removed link field
});

// Define the relationships
Menu.hasMany(MenuItem, {
  foreignKey: 'menuId',
  as: 'menuItems',
  onDelete: 'CASCADE',
});
MenuItem.belongsTo(Menu, {
  foreignKey: 'menuId',
  as: 'menu',
});

MenuItem.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});
Page.hasMany(MenuItem, {
  foreignKey: 'pageId',
  as: 'menuItems'
});

// Sync the models with the database and insert sample data
sequelize.sync({ force: true }) // This will recreate the tables
  .then(async () => {
    console.log('Database & tables created!');

    // Create pages
    const pages = await Page.bulkCreate([
      { name: 'Payslips', link: '/payslips' },
      { name: 'Information', link: '/information' },
      { name: 'Notifications', link: '/notifications' },
      { name: 'Census', link: '/census' },
      { name: 'Messaging', link: '/messaging' },
      { name: 'Children', link: '/children' },
      { name: 'Security', link: '/security' },
      { name: 'OTP', link: '/otp' },
      { name: 'DGI', link: '/dgi' }
    ]);

    console.log('Pages created:', pages);

    // Create a menu called 'features'
    const featuresMenu = await Menu.create({
      title: 'features'
    });

    // Create menu items for the features menu (removed link field)
    const menuItems = await MenuItem.bulkCreate([
      { label: 'payslips', menuId: featuresMenu.id, pageId: pages[0].id },
      { label: 'information', menuId: featuresMenu.id, pageId: pages[1].id },
      { label: 'notifications', menuId: featuresMenu.id, pageId: pages[2].id },
      { label: 'census', menuId: featuresMenu.id, pageId: pages[3].id },
      { label: 'messaging', menuId: featuresMenu.id, pageId: pages[4].id },
      { label: 'children', menuId: featuresMenu.id, pageId: pages[5].id },
      { label: 'security', menuId: featuresMenu.id, pageId: pages[6].id },
      { label: 'OTP', menuId: featuresMenu.id, pageId: pages[7].id },
      { label: 'DGI', menuId: featuresMenu.id, pageId: pages[8].id }
    ]);

    console.log('Menu with menu items created:', featuresMenu.toJSON());
    console.log('Menu items created:', menuItems);
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = { sequelize, Menu, MenuItem, Page };
