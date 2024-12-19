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


exports.addLink = async (req, res) => {
  try {
    const { label, menuId } = req.body; // Accept menuId along with label

    if (!label || !menuId) {
      return res.status(400).json({ message: 'Both label and menuId are required' });
    }

    // Call the service to add link, MenuItem, and Page
    const { link, menuItem, page } = await linkService.addLink(menuId, label);

    res.status(201).json({ message: 'Link, MenuItem, and Page created successfully', link, menuItem, page });
  } catch (error) {
    console.error('Error adding link:', error);
    res.status(500).json({ message: 'Error adding link', error: error.message });
  }
};


// Edit a link by ID
exports.editLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;

    if (!label) {
      return res.status(400).json({ message: 'Label is required' });
    }

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
