const express = require('express');
const router = express.Router();
const menuController = require('../controllers/controller');
const linkController = require('../controllers/controller'); // Assuming you have the link controller

// Menu Items Routes

// Define route to get all menu items
router.get('/api/menuitems', menuController.getAllMenuItems);

// Define route to add a new menu item
router.post('/api/menuitems', menuController.addMenuItem);

// Define route to delete a menu item by ID
router.delete('/api/menuitems/:id', menuController.deleteMenuItem);

// Define route to edit a menu item by ID
router.put('/api/menuitems/:id', menuController.editMenuItem);

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
