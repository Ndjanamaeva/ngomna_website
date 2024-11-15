//controllers.js
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

// Controller to add a new menu item
exports.addMenuItem = async (req, res) => {
  const { label } = req.body;
  if (!label) {
    return res.status(400).json({ error: 'Menu item label is required' });
  }

  try {
    const newMenuItem = await menuService.addMenuItem(label);
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error('Error in addMenuItem:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
};

// Controller to edit a menu item by ID
exports.editMenuItem = async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ error: 'Menu item label is required' });
  }

  try {
    const updatedMenuItem = await menuService.updateMenuItem(id, label);
    if (updatedMenuItem) {
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Error in editMenuItem:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
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
