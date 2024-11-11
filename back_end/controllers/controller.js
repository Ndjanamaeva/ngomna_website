const { Menu, MenuItem, Page } = require('../config/Database');

// Get all pages
exports.getPages = async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single page by ID
exports.getPage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const page = await Page.findByPk(pageId);
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new page
exports.addPage = async (req, res) => {
  try {
    const { name, link, text, image } = req.body;
    const page = await Page.create({ name, link, text, image });
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing page
exports.updatePage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { name, link, text, image } = req.body;
    const page = await Page.findByPk(pageId);
    if (page) {
      page.set({ name, link, text, image });
      await page.save();
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a page
exports.deletePage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const page = await Page.findByPk(pageId);
    if (page) {
      await page.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menus with associated menu items and their pages
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [
        { 
          model: MenuItem, 
          as: 'menuItems',
          include: [{ model: Page, as: 'page' }]
        }
      ]
    });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get menu items for a specific menu, including associated pages
exports.getMenuItems = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId, {
      include: [
        { 
          model: MenuItem, 
          as: 'menuItems',
          include: [{ model: Page, as: 'page' }]
        }
      ]
    });
    if (menu) {
      res.json(menu.menuItems);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a menu item with an associated page to a specific menu
exports.addMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { label, pageId } = req.body;
    const menu = await Menu.findByPk(menuId);
    const page = await Page.findByPk(pageId);
    if (menu && page) {
      const menuItem = await MenuItem.create({ label, menuId, pageId });
      res.status(201).json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu or Page not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu item, including its associated page
exports.updateMenuItem = async (req, res) => {
  try {
    const { menuId, itemId } = req.params;
    const { label, pageId } = req.body;
    const menuItem = await MenuItem.findByPk(itemId);
    const page = await Page.findByPk(pageId);
    if (menuItem && page) {
      menuItem.set({ label, pageId });
      await menuItem.save();
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item or Page not found' });
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
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
