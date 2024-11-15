const { MenuItem, Page } = require('../config/Database');

// Service to fetch all menu items with their associated pages
exports.getAllMenuItems = async () => {
  try {
    const menuItems = await MenuItem.findAll({
      include: [{
        model: Page,
        as: 'page',
        attributes: ['name', 'link'], // Include page details
      }],
    });
    return menuItems;
  } catch (error) {
    console.error('Error in getAllMenuItems service:', error);
    throw error;
  }
};

// Service to delete a menu item by ID
exports.deleteMenuItem = async (id) => {
  try {
    const menuItem = await MenuItem.findByPk(id);

    if (!menuItem) {
      return false;  // Return false if the menu item is not found
    }

    // Delete the menu item
    await menuItem.destroy();
    return true;
  } catch (error) {
    console.error('Error in deleteMenuItem service:', error);
    throw error;
  }
};
