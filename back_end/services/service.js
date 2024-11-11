const { Menu, MenuItem, Page } = require('../config/Database');

// Get all menus with their associated menu items and pages
exports.getAllMenus = async () => {
  return await Menu.findAll({
    include: [
      { 
        model: MenuItem, 
        as: 'menuItems',
        include: [{ model: Page, as: 'page' }] // Include Page for each MenuItem
      }
    ]
  });
};

// Get a specific menu by its ID, including its menu items and associated pages
exports.getMenuById = async (menuId) => {
  return await Menu.findByPk(menuId, {
    include: [
      { 
        model: MenuItem, 
        as: 'menuItems',
        include: [{ model: Page, as: 'page' }] // Include Page for each MenuItem
      }
    ]
  });
};

// Create a new menu with associated menu items
exports.createMenu = async (menuData) => {
  const { title, menuItems } = menuData;
  return await Menu.create(
    { title, menuItems },
    { include: [{ model: MenuItem, as: 'menuItems' }] }
  );
};

// Update an existing menu, including its menu items
exports.updateMenu = async (menuId, menuData) => {
  const { title, menuItems } = menuData;
  const menu = await Menu.findByPk(menuId);
  if (menu) {
    menu.title = title;
    await menu.save();
    // Update or add menu items
    if (menuItems) {
      await Promise.all(menuItems.map(async (item) => {
        const existingItem = await MenuItem.findByPk(item.id);
        if (existingItem) {
          existingItem.label = item.label;
          existingItem.pageId = item.pageId;
          await existingItem.save();
        } else {
          await MenuItem.create({ label: item.label, menuId: menu.id, pageId: item.pageId });
        }
      }));
    }
    return menu;
  }
  throw new Error('Menu not found');
};

// Delete a menu by its ID and its associated menu items
exports.deleteMenu = async (menuId) => {
  const menu = await Menu.findByPk(menuId);
  if (menu) {
    await menu.destroy();
    return { message: 'Menu deleted successfully' };
  }
  throw new Error('Menu not found');
};

// Get all pages
exports.getAllPages = async () => {
  return await Page.findAll();
};

// Get a specific page by its ID
exports.getPageById = async (pageId) => {
  return await Page.findByPk(pageId);
};

// Create a new page
exports.createPage = async (pageData) => {
  const { name, link, text, image } = pageData;
  return await Page.create({ name, link, text, image });
};

// Update an existing page
exports.updatePage = async (pageId, pageData) => {
  const { name, link, text, image } = pageData;
  const page = await Page.findByPk(pageId);
  if (page) {
    page.name = name;
    page.link = link;
    page.text = text;
    page.image = image;
    await page.save();
    return page;
  }
  throw new Error('Page not found');
};

// Delete a page
exports.deletePage = async (pageId) => {
  const page = await Page.findByPk(pageId);
  if (page) {
    await page.destroy();
    return { message: 'Page deleted successfully' };
  }
  throw new Error('Page not found');
};

// Add a menu item to a specific menu, linking it to a page
exports.addMenuItem = async (menuId, menuItemData) => {
  const { label, pageId } = menuItemData;
  const menu = await Menu.findByPk(menuId);
  const page = await Page.findByPk(pageId);
  if (menu && page) {
    const menuItem = await MenuItem.create({ label, menuId, pageId });
    return menuItem;
  }
  throw new Error('Menu or Page not found');
};

// Update a menu item
exports.updateMenuItem = async (menuId, itemId, menuItemData) => {
  const { label, pageId } = menuItemData;
  const menuItem = await MenuItem.findByPk(itemId);
  const page = await Page.findByPk(pageId);
  if (menuItem && page) {
    menuItem.label = label;
    menuItem.pageId = pageId;
    await menuItem.save();
    return menuItem;
  }
  throw new Error('Menu item or Page not found');
};

// Delete a menu item
exports.deleteMenuItem = async (menuId, itemId) => {
  const menuItem = await MenuItem.findByPk(itemId);
  if (menuItem) {
    await menuItem.destroy();
    return { message: 'Menu item deleted successfully' };
  }
  throw new Error('Menu item not found');
};
