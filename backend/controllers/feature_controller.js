const feature_service = require('../services/feature_service');

exports.getFeatures = async (req, res) => {
  try {
    const features = await feature_service.getAllFeatures();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve features' });
  }
};

exports.createFeature = async (req, res) => {
  const { name } = req.body;
  try {
    const feature = await feature_service.createFeature(name);
    res.json(feature);
  } catch (error) {
    res.status(400).json({ error: 'Feature already exists' });
  }
};

exports.updateFeature = async (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  try {
    const updatedFeature = await feature_service.updateFeature(index, name);
    res.json(updatedFeature);
  } catch (error) {
    res.status(404).json({ error: 'Feature not found' });
  }
};

exports.deleteFeature = async (req, res) => {
  const { index } = req.params;
  try {
    await feature_service.deleteFeature(index);
    res.json({ message: 'Feature deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Feature not found' });
  }
};
