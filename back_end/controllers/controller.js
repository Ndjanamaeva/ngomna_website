const menuService = require('../services/service');

// Controller to get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    console.error('Error in getAllMenuItems:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// Controller to delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await menuService.deleteMenuItem(id);
    if (result) {
      res.json({ message: 'Menu item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Error in deleteMenuItem:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
};
