//service.js

const { MenuItem } = require('../config/Database');
const { Link } = require('../config/Database');


// Get all menu items for a specific menu
exports.getAllMenuItemsForMenu = async (menuId) => {
  try {
    return await MenuItem.findAll({ where: { menuId } });
  } catch (error) {
    console.error('Error fetching menu items for menu:', error);
    throw new Error('Failed to fetch menu items for menu');
  }
};

// Add a new menu item for a specific menu
exports.addMenuItemToMenu = async (menuId, label, pageId) => {
  try {
    const newMenuItem = await MenuItem.create({ label, menuId, pageId });
    return newMenuItem;
  } catch (error) {
    console.error('Error in addMenuItemToMenu service:', error);
    throw new Error('Failed to add menu item');
  }
};


// Edit (update) a menu item by ID for a specific menu
exports.editMenuItem = async (id, data) => {
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) return null;

    await menuItem.update(data);
    return menuItem;
  } catch (error) {
    console.error('Error in editMenuItem service:', error);
    throw new Error('Failed to edit menu item');
  }
};

// Delete a menu item by ID for a specific menu
exports.deleteMenuItem = async (id) => {
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) return null;

    await menuItem.destroy();
    return { message: 'Menu item deleted successfully' };
  } catch (error) {
    console.error('Error in deleteMenuItem service:', error);
    throw new Error('Failed to delete menu item');
  }
};

// Add a new link
exports.addLink = async (label, url) => {
  try {
    const newLink = await Link.create({ label, url});
    return newLink;
  } catch (error) {
    console.error('Error adding link:', error);
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