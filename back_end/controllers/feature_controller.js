const { Menu, MenuItem } = require('../config/Database');

// Get all menus with their menu items
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve menus' });
  }
};

// Create a new menu with menu items
exports.createMenu = async (req, res) => {
  const { title, menuItems } = req.body;
  try {
    const menu = await Menu.create({
      title,
      menuItems
    }, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    res.json(menu);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create menu' });
  }
};

// Update a menu's title and its menu items
exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  const { title, menuItems } = req.body;
  try {
    const menu = await Menu.findByPk(id, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });
    if (menu) {
      menu.title = title;
      await menu.save();

      // Update menu items
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
      res.status(404).json({ error: 'Menu not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update menu' });
  }
};

// Delete a menu and its menu items
exports.deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findByPk(id);
    if (menu) {
      await menu.destroy();
      res.json({ message: 'Menu deleted' });
    } else {
      res.status(404).json({ error: 'Menu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu' });
  }
};

// Add a menu item to a specific menu
exports.addMenuItem = async (req, res) => {
  const { menuId } = req.params;
  const { label } = req.body;
  try {
    const menu = await Menu.findByPk(menuId);
    if (menu) {
      const menuItem = await MenuItem.create({ label, menuId });
      res.json(menuItem);
    } else {
      res.status(404).json({ error: 'Menu not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to add menu item' });
  }
};

// Update a menu item within a specific menu
exports.updateMenuItem = async (req, res) => {
  const { menuId, itemId } = req.params;
  const { label } = req.body;
  try {
    const menuItem = await MenuItem.findOne({ where: { id: itemId, menuId } });
    if (menuItem) {
      menuItem.label = label;
      await menuItem.save();
      res.json(menuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update menu item' });
  }
};

// Delete a menu item within a specific menu
exports.deleteMenuItem = async (req, res) => {
  const { menuId, itemId } = req.params;
  try {
    const menuItem = await MenuItem.findOne({ where: { id: itemId, menuId } });
    if (menuItem) {
      await menuItem.destroy();
      res.json({ message: 'Menu item deleted' });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
};
