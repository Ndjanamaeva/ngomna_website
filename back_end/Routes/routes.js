const express = require('express');
const router = express.Router();
const feature_controller = require('../controllers/controller');

// Routes for menus
router.get('/', feature_controller.getMenus);
router.post('/', feature_controller.createMenu);
router.put('/:id', feature_controller.updateMenu);
router.delete('/:id', feature_controller.deleteMenu);

// Routes for menu items within a specific menu
router.get('/:menuId/menu-items', feature_controller.getMenuItems); // Fetch menu items
router.post('/:menuId/menu-items', feature_controller.addMenuItem);
router.put('/:menuId/menu-items/:itemId', feature_controller.updateMenuItem);
router.delete('/:menuId/menu-items/:itemId', feature_controller.deleteMenuItem);

module.exports = router;