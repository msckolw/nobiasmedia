const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all articles
router.get('/news', async (req, res) => {
  try {
    const articles = await News.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single article
router.get('/news/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new article
router.post('/news', async (req, res) => {
  try {
    console.log('Received article data:', req.body);
    
    // Validate required fields
    if (!req.body.title || !req.body.content || !req.body.summary || !req.body.category) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: req.body
      });
    }

    const article = new News({
      title: req.body.title,
      content: req.body.content,
      summary: req.body.summary,
      imageUrl: req.body.imageUrl || 'https://via.placeholder.com/300x200',
      category: req.body.category,
      createdAt: new Date().toISOString()
    });

    console.log('Creating article:', article);
    const newArticle = await article.save();
    console.log('Article created successfully:', newArticle);
    
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(400).json({ 
      message: error.message,
      error: error
    });
  }
});

// Delete an article
router.delete('/news/:id', async (req, res) => {
  try {
    const article = await News.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all articles
router.delete('/news', async (req, res) => {
  try {
    await News.deleteMany({});
    res.json({ message: 'All articles deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
