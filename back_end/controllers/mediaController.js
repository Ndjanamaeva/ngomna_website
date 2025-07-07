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

// Update text by pageId
exports.updateTextByPageId = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { title, content } = req.body;
    const text = await Text.findOne({ where: { pageId } });
    if (!text) {
      return res.status(404).json({ message: 'Text not found' });
    }
    text.title = title;
    text.content = content;
    await text.save();
    res.json(text);
  } catch (error) {
    console.error('Error updating text:', error);
    res.status(500).json({ message: 'Server error' });
  }
};