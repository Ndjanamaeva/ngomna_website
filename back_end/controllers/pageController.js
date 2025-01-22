const pageService = require('../services/service');

class PageController {
  async getAllPages(req, res) {
    try {
      const pages = await pageService.getAllPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pages' });
    }
  }

  async getPageByPath(req, res) {
    try {
      const { path } = req.params;
      const page = await pageService.getPageByPath(path);
      
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch page' });
    }
  }

  async createPage(req, res) {
    try {
      const { title, path, content } = req.body;
      
      if (!title || !path || !content) {
        return res.status(400).json({ error: 'Title, path, and content are required' });
      }

      const newPage = await pageService.createPage({ title, path, content });
      res.status(201).json(newPage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create page' });
    }
  }

  async updatePage(req, res) {
    try {
      const { id } = req.params;
      const { title, path, content } = req.body;
      
      if (!title && !path && !content) {
        return res.status(400).json({ error: 'At least one field to update is required' });
      }

      const updatedPage = await pageService.updatePage(id, { title, path, content });
      
      if (!updatedPage) {
        return res.status(404).json({ error: 'Page not found' });
      }
      
      res.json(updatedPage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update page' });
    }
  }

  async deletePage(req, res) {
    try {
      const { id } = req.params;
      const deleted = await pageService.deletePage(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Page not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete page' });
    }
  }
}

module.exports = new PageController();