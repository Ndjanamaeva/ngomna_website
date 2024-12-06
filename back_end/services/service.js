const { MenuItem } = require('../config/Database');
const { Link } = require('../config/Database');

// Service function to add a new menu item
exports.addMenuItem = async (label) => {
  try {
    // Ensure label is a string
    if (typeof label !== 'string') {
      throw new Error('Label must be a string');
    }
    const newMenuItem = await MenuItem.create({ label });
    return newMenuItem;
  } catch (error) {
    console.error('Error in addMenuItem service:', error);
    throw new Error('Failed to add menu item');
  }
};

// Service function to update a menu item by ID
exports.updateMenuItem = async (id, label) => {
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) return null;
    
    menuItem.label = label;
    await menuItem.save();
    return menuItem;
  } catch (error) {
    console.error('Error in updateMenuItem service:', error);
    throw new Error('Failed to update menu item');
  }
};

// Service function to edit (update) a menu item by ID
exports.editMenuItem = async (id, data) => {
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) return null;

    // Update the menu item with new data
    await menuItem.update(data);
    return menuItem; // Return the updated menu item
  } catch (error) {
    console.error('Error in editMenuItem service:', error);
    throw new Error('Failed to edit menu item');
  }
};

// Service function to get all menu items
exports.getAllMenuItems = async () => {
  try {
    return await MenuItem.findAll(); // Assuming MenuItem is the Sequelize model
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items');
  }
};

// Service function to delete a menu item by ID
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

// Service function to add a new menu item
exports.addMenuItem = async (label) => {
  try {
    // Ensure label is a string
    if (typeof label !== 'string') {
      throw new Error('Label must be a string');
    }
    const newMenuItem = await MenuItem.create({ label });
    return newMenuItem;
  } catch (error) {
    console.error('Error in addMenuItem service:', error);
    throw new Error('Failed to add menu item');
  }
};

// Service function to add a new link
exports.addLink = async (label) => {
  try {
    // Ensure label is a string
    if (typeof label !== 'string') {
      throw new Error('Label must be a string');
    }
    const newLink = await MenuItem.create({ label });
    return newLink;
  } catch (error) {
    console.error('Error in addLink service:', error);
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
