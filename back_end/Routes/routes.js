//routes.js

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/controller');
const linkController = require('../controllers/controller'); // Assuming you have the link controller

// Menu Items Routes

// Routes for menu items for a specific menu
router.get('/api/menuitems/:menuId', menuController.getAllMenuItemsForMenu);  // Get all items for a specific menu
router.post('/api/menuitems/:menuId', menuController.addMenuItemToMenu);      // Add a new menu item to a specific menu
router.put('/api/menuitems/:id', menuController.editMenuItem);               // Edit a menu item by ID
router.delete('/api/menuitems/:id', menuController.deleteMenuItem); 

// Links Routes

// Menu Items Routes

// Define route to get all links
router.get('/api/links', linkController.getAllLinks);

// Define route to add a new link
router.post('/api/links', linkController.addLink);

// Define route to delete a link by ID
router.delete('/api/links/:id', linkController.deleteLink);

// Define route to edit a link by ID
router.put('/api/links/:id', linkController.editLink);

module.exports = router;
