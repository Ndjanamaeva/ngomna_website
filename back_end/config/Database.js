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

// Define the Page model (page table)
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

// Define the MenuItem model (menu_item table)
const MenuItem = sequelize.define('MenuItem', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {  // Add a link field to MenuItem
    type: DataTypes.STRING,
    allowNull: false
  }
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

// Each MenuItem corresponds to one Page
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
      { name: 'Payslips', link: '/payslips', text: 'Payslips Page', image: 'payslips.jpg' },
      { name: 'Information', link: '/information', text: 'Information Page', image: 'information.jpg' },
      { name: 'Notifications', link: '/notifications', text: 'Notifications Page', image: 'notifications.jpg' },
      { name: 'Census', link: '/census', text: 'Census Page', image: 'census.jpg' },
      { name: 'Messaging', link: '/messaging', text: 'Messaging Page', image: 'messaging.jpg' },
      { name: 'Children', link: '/children', text: 'Children Page', image: 'children.jpg' },
      { name: 'Security', link: '/security', text: 'Security Page', image: 'security.jpg' },
      { name: 'OTP', link: '/otp', text: 'OTP Page', image: 'otp.jpg' },
      { name: 'DGI', link: '/dgi', text: 'DGI Page', image: 'dgi.jpg' }
    ]);

    console.log('Pages created:', pages);

    // Create a menu called 'features' with menu items linked to pages
    const featuresMenu = await Menu.create({
      title: 'features',
      menuItems: [
        { label: 'payslips', link: pages[0].link, pageId: pages[0].id },
        { label: 'information', link: pages[1].link, pageId: pages[1].id },
        { label: 'notifications', link: pages[2].link, pageId: pages[2].id },
        { label: 'census', link: pages[3].link, pageId: pages[3].id },
        { label: 'messaging', link: pages[4].link, pageId: pages[4].id },
        { label: 'children', link: pages[5].link, pageId: pages[5].id },
        { label: 'security', link: pages[6].link, pageId: pages[6].id },
        { label: 'OTP', link: pages[7].link, pageId: pages[7].id },
        { label: 'DGI', link: pages[8].link, pageId: pages[8].id }
      ]
    }, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });

    console.log('Menu with menu items created:', featuresMenu.toJSON());
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = { sequelize, Menu, MenuItem, Page };
