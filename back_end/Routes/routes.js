//routes.js

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const linkController = require('../controllers/linkController');


// Route to get all menus
router.get('/api/menus', menuController.getAllMenus);

// Routes for managing menu items
router.get('/api/menuitems/:menuId', menuController.getAllMenuItemsForMenu);
router.post('/api/menuitems/:menuId', menuController.addMenuItemToMenu);
router.put('/api/menuitems/:id', menuController.editMenuItem);
router.delete('/api/menuitems/label/:label', menuController.deleteMenuItem);  // Using label for deletion


// Link Routes
router.get('/api/links', linkController.getAllLinks);
router.post('/api/links', linkController.addLink);
router.put('/api/links/:id', linkController.editLink);
router.delete('/api/links/:id', linkController.deleteLink);

module.exports = router;
