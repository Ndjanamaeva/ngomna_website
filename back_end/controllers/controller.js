const menuService = require('../services/service');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { label } = req.body;

    // Validate that label is provided and is a string
    if (!label || typeof label !== 'string') {
      return res.status(400).json({ message: 'Invalid label. Label must be a non-empty string.' });
    }

    const newMenuItem = await menuService.addMenuItem(label);
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item', error: error.message });
  }
};


// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await menuService.deleteMenuItem(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};

// Edit a menu item by ID
exports.editMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;

    const updatedMenuItem = await menuService.editMenuItem(id, { label });
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};