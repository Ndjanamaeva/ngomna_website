const express = require('express');
const router = express.Router();
const feature_controller = require('../controllers/feature_controller');

router.get('/', feature_controller.getFeatures);
router.post('/', feature_controller.createFeature);
router.put('/:index', feature_controller.updateFeature);
router.delete('/:index', feature_controller.deleteFeature);

module.exports = router;
