const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Hardcoded blog posts
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Node.js",
    author: "John Doe",
    date: "2024-01-15",
    excerpt: "Learn the basics of Node.js and how to build scalable applications.",
    content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, making it possible to build full-stack applications with a single language. This tutorial covers the fundamentals of Node.js including modules, npm packages, and creating your first server."
  },
  {
    id: 2,
    title: "React Hooks: A Complete Guide",
    author: "Jane Smith",
    date: "2024-02-10",
    excerpt: "Understand React Hooks and how they simplify state management.",
    content: "React Hooks revolutionized how we write React components. Instead of using class components with complex lifecycle methods, Hooks allow you to use state and other React features in functional components. This guide covers useState, useEffect, useContext, and how to create custom hooks for your applications."
  },
  {
    id: 3,
    title: "Building REST APIs with Express",
    author: "Mike Johnson",
    date: "2024-02-20",
    excerpt: "Master the creation of robust REST APIs using Express.js.",
    content: "Express is a minimal and flexible Node.js framework that makes building REST APIs straightforward. In this comprehensive guide, we'll explore routing, middleware, error handling, and best practices for creating production-ready APIs. Learn how to structure your codebase and implement proper HTTP status codes."
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    author: "Sarah Williams",
    date: "2024-03-05",
    excerpt: "A detailed comparison of CSS Grid and Flexbox for modern layouts.",
    content: "CSS Grid and Flexbox are powerful layout tools in modern CSS. While Flexbox is great for one-dimensional layouts (rows or columns), CSS Grid excels at two-dimensional layouts. This article provides practical examples of when to use each technology and how they can complement each other in your web projects."
  },
  {
    id: 5,
    title: "Understanding Async/Await in JavaScript",
    author: "David Brown",
    date: "2024-03-15",
    excerpt: "Master asynchronous programming with async/await patterns.",
    content: "Async/await syntax makes working with promises in JavaScript much cleaner and more readable. Instead of chaining .then() calls, you can write asynchronous code that looks synchronous. Learn how to properly handle errors, work with multiple async operations, and avoid common pitfalls when using async/await."
  }
];

// API Routes
app.get('/api/blogs', (req, res) => {
  res.json(blogPosts);
});

app.get('/api/blogs/:id', (req, res) => {
  const blogPost = blogPosts.find(post => post.id === parseInt(req.params.id));
  if (!blogPost) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  res.json(blogPost);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog API server is running on http://localhost:${PORT}`);
});
