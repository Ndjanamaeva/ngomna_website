// controllers/pageController.js

const pageService = require('../services/service');

exports.getPages = async (req, res) => {
  try {
    const pages = await pageService.getAllPages();
    res.status(200).json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updatePage = async (req, res) => {
  const { id } = req.params;
  const { label, contentType } = req.body;

  try {
    const updatedPage = await pageService.updatePage(id, { label, contentType });
    if (!updatedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
