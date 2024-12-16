//linkController.js

const linkService = require('../services/service');

// Get all links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await linkService.getAllLinks();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching links', error });
  }
};

// Add a new link
exports.addLink = async (req, res) => {
  try {
    const { label, url } = req.body;

    if (!label || !url) {
      return res.status(400).json({ message: 'Label and URL are required' });
    }

    const newLink = await linkService.addLink(label, url);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Error adding link', error });
  }
};

// Edit a link by ID
exports.editLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;

    const updatedLink = await linkService.editLink(id, { label });
    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: 'Error updating link', error });
  }
};

// Delete a link by ID
exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    await linkService.deleteLink(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting link', error });
  }
};
