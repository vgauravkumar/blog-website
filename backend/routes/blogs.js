const express = require('express');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// Get single blog (public)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
});

// Create blog (protected - requires login)
router.post('/', protect, async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      author: req.userId,
      authorName: user.name,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
});

// Update blog (protected - only by author)
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    blog.title = title || blog.title;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
});

// Delete blog (protected - only by author)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
});

module.exports = router;
