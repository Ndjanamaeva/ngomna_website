const express = require('express');
const router = express.Router();
const featureController = require('../controllers/controller');

// Routes for menus
router.get('/menus', featureController.getMenus); // Fetch all menus

// Routes for menu items within a specific menu
router.get('/menus/:menuId/menu-items', featureController.getMenuItems); // Fetch menu items for a specific menu
router.post('/menus/:menuId/menu-items', featureController.addMenuItem); // Add a new menu item to a menu
router.put('/menus/:menuId/menu-items/:itemId', featureController.updateMenuItem); // Update a specific menu item
router.delete('/menus/:menuId/menu-items/:itemId', featureController.deleteMenuItem); // Delete a specific menu item

// Routes for pages
router.get('/pages', featureController.getPages); // Fetch all pages
router.post('/pages', featureController.addPage); // Create a new page
router.get('/pages/:pageId', featureController.getPage); // Fetch a specific page by ID
router.put('/pages/:pageId', featureController.updatePage); // Update a specific page
router.delete('/pages/:pageId', featureController.deletePage); // Delete a specific page

module.exports = router;
