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
    const { label } = req.body;

    if (!label) {
      return res.status(400).json({ message: 'Label is required' });
    }

    const newMenuItem = await menuService.addMenuItemToMenu(menuId, label);
    res.status(201).json(newMenuItem); // Send the newly created items as response
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item', error });
  }
};

// Delete a menu item based on its label
exports.deleteMenuItem = async (req, res) => {
  try {
    const { label } = req.params;  // Using label instead of id
    const result = await menuService.deleteMenuItemByLabel(label);

    if (!result) {
      return res.status(404).json({ message: 'Menu item with the specified label not found' });
    }

    res.status(204).send();  // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};

// Update a menu item, link, and page
exports.updateMenuItem = async (req, res) => {
  try {
    const { label } = req.params; // Existing label to identify the menu item
    const { label: newLabel } = req.body; // New label for update

    if (!newLabel) {
      return res.status(400).json({ message: 'New label is required' });
    }

    const updatedData = await menuService.updateMenuItemAndDependencies(label, newLabel);

    if (!updatedData) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};
