//service.js

const { MenuItem, Link, Page, Menu } = require('../config/Database');


// Get all menus
exports.getAllMenus = async () => {
  try {
    return await Menu.findAll();
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw new Error('Failed to fetch menus');
  }
};

// Get all menu items for a specific menu
exports.getAllMenuItemsForMenu = async (menuId) => {
  try {
    const menuItems = await MenuItem.findAll({ where: { menuId } });
    return menuItems;
  } catch (error) {
    console.error('Error fetching menu items', error);
    throw new Error('Error fetching menu items');
  }
};

// Add a new menu item to a specific menu and create corresponding link and page
exports.addMenuItemToMenu = async (menuId, label) => {
  try {
    // Auto-generate URL from the label
    const url = `/${label.toLowerCase().replace(/\s+/g, '-')}`;

    // Create the page
    const page = await Page.create({ name: label, url });

    // Create the link
    const link = await Link.create({ label, url: page.url, pageId: page.id });

    // Create the menu item
    const menuItem = await MenuItem.create({ menuId, label, pageId: page.id });

    return { menuItem, page, link };
  } catch (error) {
    console.error('Error adding menu item, link, and page:', error);
    throw new Error('Failed to add menu item');
  }
};

// Edit a menu item by ID
exports.editMenuItem = async (id, data) => {
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) return null;

    menuItem.label = data.label;
    await menuItem.save();
    return menuItem;
  } catch (error) {
    console.error('Error updating menu item', error);
    throw new Error('Error updating menu item');
  }
};

// Delete a menu item based on its label
exports.deleteMenuItemByLabel = async (label) => {
  try {
    const menuItem = await MenuItem.findOne({ where: { label }, include: [{ model: Page, as: 'page' }] });

    if (!menuItem) return null;

    const link = await Link.findOne({ where: { pageId: menuItem.pageId } });
    if (link) await link.destroy();

    const page = menuItem.page;
    if (page) await page.destroy();

    await menuItem.destroy();
    return true;
  } catch (error) {
    console.error('Error deleting menu item', error);
    throw new Error('Failed to delete menu item');
  }
};

// service.js
exports.addLink = async (menuId, label) => {
  try {
    const url = `/${label.toLowerCase().replace(/\s+/g, '-')}`;  // Auto-generate URL

    // Create page
    const page = await Page.create({ name: label, url });

    // Create link associated with the page
    const link = await Link.create({ label, url: page.url, pageId: page.id });

    // Create MenuItem associated with the link and menu
    const menuItem = await MenuItem.create({ label, menuId, pageId: page.id });

    return { link, menuItem, page };
  } catch (error) {
    console.error('Error adding link, menu item, and page:', error);
    throw new Error('Failed to add link');
  }
};

// Service function to update a link by ID
exports.updateLink = async (id, label) => {
  try {
    const link = await Link.findByPk(id);
    if (!link) return null;
    
    link.label = label;
    await link.save();
    return link;
  } catch (error) {
    console.error('Error in updateLink service:', error);
    throw new Error('Failed to update link');
  }
};

// Service function to edit (update) a link by ID
exports.editLink= async (id, data) => {
  try {
    const link = await Link.findByPk(id);
    if (!link) return null;

    // Update the link with new data
    await link.update(data);
    return link; // Return the updated link
  } catch (error) {
    console.error('Error in editLink service:', error);
    throw new Error('Failed to edit link');
  }
};

// Service function to get all links
exports.getAllLinks = async () => {
  try {
    return await Link.findAll(); // Assuming Link is the Sequelize model
  } catch (error) {
    console.error('Error fetching links:', error);
    throw new Error('Failed to fetch links');
  }
};

// Service function to delete a link by ID
exports.deleteLink = async (id) => {
  try {
    const link = await Link.findByPk(id);
    if (!link) return null;

    await link.destroy();
    return { message: 'Link deleted successfully' };
  } catch (error) {
    console.error('Error in deleteLink service:', error);
    throw new Error('Failed to delete link');
  }
};