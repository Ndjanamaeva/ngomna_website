const menuService = require('../services/service');
const linkService = require('../services/service'); // Assuming the link service functions are defined

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

// Get all links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await linkService.getAllLinks();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching links', error });
  }
};


// Add a new link
exports.addLink = async (req, res) => {
  try {
    const { label } = req.body;

    // Validate that label is provided and is a string
    if (!label || typeof label !== 'string') {
      return res.status(400).json({ message: 'Invalid label. Label must be a non-empty string.' });
    }

    const newLink = await linkService.addLink(label);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Error adding link', error: error.message });
  }
};

// Delete a link
exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    await linkService.deleteLink(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting link', error });
  }
};

// Edit a link by ID
exports.editLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;

    const updatedLink = await linkService.editLink(id, { label });
    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: 'Error updating link', error });
  }
};
