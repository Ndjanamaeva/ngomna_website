const { Feature } = require('../config/Database');

exports.getAllFeatures = async () => {
  const features = await Feature.findAll();
  return features.map(feature => feature.name);
};

exports.createFeature = async (name) => {
  const feature = await Feature.create({ name });
  return feature.name;
};

exports.updateFeature = async (index, name) => {
  const feature = await Feature.findOne({ where: { name: index } });
  if (feature) {
    feature.name = name;
    await feature.save();
    return feature.name;
  } else {
    throw new Error('Feature not found');
  }
};

exports.deleteFeature = async (index) => {
  const feature = await Feature.findOne({ where: { name: index } });
  if (feature) {
    await feature.destroy();
  } else {
    throw new Error('Feature not found');
  }
};
