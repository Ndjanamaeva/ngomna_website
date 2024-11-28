const { MenuItem } = require('../config/Database'); // Adjust the path as per your project structure

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
