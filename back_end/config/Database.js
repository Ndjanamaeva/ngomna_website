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
  }

});

// Define the MenuItem model (menuitem table) 
const MenuItem = sequelize.define('MenuItem', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }

});

// Define the Links model (links table) 
const Link = sequelize.define('Link', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Page,
      key: 'id'
    }
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

MenuItem.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});
Page.hasMany(MenuItem, {
  foreignKey: 'pageId',
  as: 'menuItems'
});

Link.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});
Page.hasMany(Link, {
  foreignKey: 'pageId',
  as: 'links'
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
      { name: 'DGI', link: '/dgi' },
      { name: 'Mission', link: '/mission' },
      { name: 'Vision', link: '/vision' },
      { name: 'Perspectives', link: '/perspectives' },
      { name: 'WhatsApp', link: '/whatsapp' },
      { name: 'E-mail', link: '/email' },
      { name: 'Facebook', link: '/facebook' }
    ]);

    console.log('Pages created:', pages);

    // Create links
    const links = await Link.bulkCreate([
      { label: 'payslips', url: '/payslips', pageId: pages[0].id },
      { label: 'information', url: '/information', pageId: pages[1].id },
      { label: 'notifications', url: '/notifications', pageId: pages[2].id },
      { label: 'census', url: '/census', pageId: pages[3].id },
      { label: 'messaging', url: '/messaging', pageId: pages[4].id },
      { label: 'children', url: '/children', pageId: pages[5].id },
      { label: 'security', url: '/security', pageId: pages[6].id },
      { label: 'OTP', url: '/otp', pageId: pages[7].id },
      { label: 'DGI', url: '/dgi', pageId: pages[8].id },
      { label: 'mission', url: '/mission', pageId: pages[9].id },
      { label: 'vision', url: '/vision', pageId: pages[10].id },
      { label: 'perspectives', url: '/perspectives', pageId: pages[11].id },
      { label: 'whatsapp', url: '/whatsapp', pageId: pages[12].id  },
      { label: 'e-mail', url: '/email', pageId: pages[13].id  },
      { label: 'facebook', url: '/facebook', pageId: pages[14].id  }
    ]);

    console.log('Links created:', links);

    // Create menus 'features', 'about', and 'contact'
    const featuresMenu = await Menu.create({
      title: 'features'
    });

    const aboutMenu = await Menu.create({
      title: 'about'
    });

    const contactMenu = await Menu.create({
      title: 'contact'
    });

    console.log('Menus created:', { featuresMenu, aboutMenu, contactMenu });

    // Create menu items for the features menu
    const menuItems = await MenuItem.bulkCreate([
      { label: 'payslips', menuId: featuresMenu.id, pageId: pages[0].id },
      { label: 'information', menuId: featuresMenu.id, pageId: pages[1].id },
      { label: 'notifications', menuId: featuresMenu.id, pageId: pages[2].id },
      { label: 'census', menuId: featuresMenu.id, pageId: pages[3].id },
      { label: 'messaging', menuId: featuresMenu.id, pageId: pages[4].id },
      { label: 'children', menuId: featuresMenu.id, pageId: pages[5].id },
      { label: 'security', menuId: featuresMenu.id, pageId: pages[6].id },
      { label: 'OTP', menuId: featuresMenu.id, pageId: pages[7].id },
      { label: 'DGI', menuId: featuresMenu.id, pageId: pages[8].id },
      { label: 'mission', menuId: aboutMenu.id, pageId: pages[9].id },
      { label: 'vision', menuId: aboutMenu.id, pageId: pages[10].id },
      { label: 'perspectives', menuId: aboutMenu.id, pageId: pages[11].id },
      { label: 'whatsapp', menuId: contactMenu.id, pageId: pages[11].id },
      { label: 'e-mail', menuId: contactMenu.id, pageId: pages[11].id },
      { label: 'facebook', menuId: contactMenu.id, pageId: pages[11].id },
    ]);

    console.log('Menu with menu items created:', featuresMenu.toJSON());
    console.log('Menu items created:', menuItems);
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = { sequelize, Menu, MenuItem, Page, Link };