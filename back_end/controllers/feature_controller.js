const { Menu, MenuItem } = require('../config/Database');

// Get all menus
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new menu
exports.createMenu = async (req, res) => {
  try {
    const { title, menuItems } = req.body;
    const menu = await Menu.create({ title, menuItems }, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, menuItems } = req.body;
    const menu = await Menu.findByPk(id, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    if (menu) {
      menu.title = title;
      await menu.save();
      if (menuItems) {
        await Promise.all(menuItems.map(async (item) => {
          const menuItem = await MenuItem.findByPk(item.id);
          if (menuItem) {
            menuItem.label = item.label;
            await menuItem.save();
          }
        }));
      }
      res.json(menu);
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a menu
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (menu) {
      await menu.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get menu items for a specific menu
exports.getMenuItems = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    if (menu) {
      res.json(menu.menuItems);
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a menu item to a specific menu
exports.addMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { label } = req.body;
    const menu = await Menu.findByPk(menuId);
    if (menu) {
      const menuItem = await MenuItem.create({ label, menuId });
      res.status(201).json(menuItem);
    } else {
      res.status(404).send('Menu not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { menuId, itemId } = req.params;
    const { label } = req.body;
    const menuItem = await MenuItem.findByPk(itemId);
    if (menuItem) {
      menuItem.label = label;
      await menuItem.save();
      res.json(menuItem);
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { menuId, itemId } = req.params;
    const menuItem = await MenuItem.findByPk(itemId);
    if (menuItem) {
      await menuItem.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
