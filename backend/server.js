const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog API server is running on http://localhost:${PORT}`);
});
