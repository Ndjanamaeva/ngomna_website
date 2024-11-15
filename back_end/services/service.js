// Service function to add a new menu item
exports.addMenuItem = async (label) => {
  try {
    const newMenuItem = await MenuItem.create({ label }); // Assuming MenuItem is your model
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
