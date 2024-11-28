const express = require('express');
const router = express.Router();
const menuController = require('../controllers/controller');

// Define route to get all menu items
router.get('/api/menuitems', menuController.getAllMenuItems);

// Define route to add a new menu item
router.post('/api/menuitems', menuController.addMenuItem);

// Define route to delete a menu item by ID
router.delete('/api/menuitems/:id', menuController.deleteMenuItem);

// Define route to edit a menu item by ID
router.put('/api/menuitems/:id', menuController.editMenuItem);

module.exports = router;
