//service
const { Menu, MenuItem } = require('../config/Database');

exports.getAllMenus = async () => {
  return await Menu.findAll({
    include: [{ model: MenuItem, as: 'menuItems' }]
  });
};

exports.createMenu = async (title, menuItems) => {
  return await Menu.create({
    title,
    menuItems
  }, {
    include: [{ model: MenuItem, as: 'menuItems' }]
  });
};

exports.updateMenu = async (id, title, menuItems) => {
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
    return menu;
  } else {
    throw new Error('Menu not found');
  }
};

exports.deleteMenu = async (id) => {
  const menu = await Menu.findByPk(id);
  if (menu) {
    await menu.destroy();
  } else {
    throw new Error('Menu not found');
  }
};