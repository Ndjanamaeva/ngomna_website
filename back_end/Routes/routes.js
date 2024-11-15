//routes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/controller');

// Define route to get all menu items
router.get('/api/menuitems', menuController.getAllMenuItems);

// Define route to delete a menu item by ID
router.delete('/api/menuitems/:id', menuController.deleteMenuItem);

module.exports = router;