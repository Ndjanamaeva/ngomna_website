//service.js

const { MenuItem, Link, Page } = require('../config/Database');

// Get all menu items for a specific menu
exports.getAllMenuItemsForMenu = async (menuId) => {
  try {
    return await MenuItem.findAll({ where: { menuId }, include: [{ model: Page, as: 'page' }] });
  } catch (error) {
    console.error('Error fetching menu items for menu:', error);
    throw new Error('Failed to fetch menu items for menu');
  }
};

// Add a new menu item for a specific menu
exports.addMenuItemToMenu = async (menuId, label) => {
  try {
    // Create a new page if no pageId is provided
    const page = await Page.create({
      name: label,
      url: `/${label.toLowerCase()}`,  // Example URL pattern
    });

    // Create a new menu item and associate it with the created page
    const newMenuItem = await MenuItem.create({
      label,
      menuId,
      pageId: page.id
    });

    // Create a new link for the page
    await Link.create({
      label,
      url: page.url,
      pageId: page.id
    });

    return newMenuItem;
  } catch (error) {
    console.error('Error in addMenuItemToMenu service:', error);
    throw new Error('Failed to add menu item');
  }
};

// Edit (update) a menu item by ID
exports.editMenuItem = async (id, data) => {
  try {
    const menuItem = await MenuItem.findByPk(id, { include: [{ model: Page, as: 'page' }] });
    if (!menuItem) return null;

    if (data.pageId && data.pageId !== menuItem.pageId) {
      const newPage = await Page.findByPk(data.pageId);
      if (!newPage) throw new Error('New Page not found');
      
      // Update the associated link
      const link = await Link.findOne({ where: { pageId: menuItem.pageId } });
      if (link) {
        await link.update({ label: data.label || menuItem.label, url: newPage.link, pageId: newPage.id });
      }
    } else if (data.label) {
      // Only update the label in the link if the pageId remains the same
      const link = await Link.findOne({ where: { pageId: menuItem.pageId } });
      if (link) await link.update({ label: data.label });
    }

    await menuItem.update(data);
    return menuItem;
  } catch (error) {
    console.error('Error in editMenuItem service:', error);
    throw new Error('Failed to edit menu item');
  }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (id) => {
  try {
    const menuItem = await MenuItem.findByPk(id, {
      include: [{ model: Page, as: 'page' }]
    });

    if (!menuItem) return null;

    // Delete the link associated with the page
    const link = await Link.findOne({ where: { pageId: menuItem.pageId } });
    if (link) await link.destroy();

    // Delete the page associated with the menu item (same URL)
    const page = menuItem.page;
    if (page) await page.destroy();

    // Delete the menu item
    await menuItem.destroy();
    return { message: 'Menu item, link, and page deleted successfully' };
  } catch (error) {
    console.error('Error in deleteMenuItem service:', error);
    throw new Error('Failed to delete menu item, link, and page');
  }
};


// service.js
exports.addLink = async (menuId, label) => {
  try {
    const url = `/${label.toLowerCase().replace(/\s+/g, '-')}`;  // Auto-generate URL

    // Create page
    const page = await Page.create({ name: label, url });

    // Create link associated with the page
    const link = await Link.create({ label, url: page.url, pageId: page.id });

    // Create MenuItem associated with the link and menu
    const menuItem = await MenuItem.create({ label, menuId, pageId: page.id });

    return { link, menuItem, page };
  } catch (error) {
    console.error('Error adding link, menu item, and page:', error);
    throw new Error('Failed to add link');
  }
};


// Service function to update a link by ID
exports.updateLink = async (id, label) => {
  try {
    const link = await Link.findByPk(id);
    if (!link) return null;
    
    link.label = label;
    await link.save();
    return link;
  } catch (error) {
    console.error('Error in updateLink service:', error);
    throw new Error('Failed to update link');
  }
};

// Service function to edit (update) a link by ID
exports.editLink= async (id, data) => {
  try {
    const link = await Link.findByPk(id);
    if (!link) return null;

    // Update the link with new data
    await link.update(data);
    return link; // Return the updated link
  } catch (error) {
    console.error('Error in editLink service:', error);
    throw new Error('Failed to edit link');
  }
};

// Service function to get all links
exports.getAllLinks = async () => {
  try {
    return await Link.findAll(); // Assuming Link is the Sequelize model
  } catch (error) {
    console.error('Error fetching links:', error);
    throw new Error('Failed to fetch links');
  }
};

// Service function to delete a link by ID
exports.deleteLink = async (id) => {
  try {
    const link = await Link.findByPk(id);
    if (!link) return null;

    await link.destroy();
    return { message: 'Link deleted successfully' };
  } catch (error) {
    console.error('Error in deleteLink service:', error);
    throw new Error('Failed to delete link');
  }
};