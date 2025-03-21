const { Text } = require('../config/Database');

// Fetch text by pageId
exports.getTextByPageId = async (req, res) => {
  try {
    const { pageId } = req.params;
    const text = await Text.findOne({ where: { pageId } });

    if (!text) {
      return res.status(404).json({ message: 'Text not found' });
    }

    res.json(text);
  } catch (error) {
    console.error('Error fetching text:', error);
    res.status(500).json({ message: 'Server error' });
  }
};