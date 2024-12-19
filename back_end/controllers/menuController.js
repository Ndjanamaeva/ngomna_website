//menuController.js

const menuService = require('../services/service');


// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await menuService.getAllMenus();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menus', error });
  }
};


// Get all menu items for a specific menu
exports.getAllMenuItemsForMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menuItems = await menuService.getAllMenuItemsForMenu(menuId);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Add a new menu item to a specific menu
exports.addMenuItemToMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { label } = req.body;  // Only 'label' is required now

    if (!label) {
      return res.status(400).json({ message: 'Label is required' });
    }

    // The service now creates the page automatically, no need for pageId
    const newMenuItem = await menuService.addMenuItemToMenu(menuId, label);
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item', error });
  }
};

// Edit a menu item by ID
exports.editMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;  // Only 'label' is updated here

    const updatedMenuItem = await menuService.editMenuItem(id, { label });
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await menuService.deleteMenuItem(id);
    if (!result) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};
