import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to load blogs. Please make sure the backend server is running on port 5000.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseDetail = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="App">
      <header>
        <h1>📚 My Blog</h1>
        <p>Sharing knowledge about web development and programming</p>
      </header>
      
      <div className="container">
        {loading && <div className="loading">Loading blogs...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <BlogList blogs={blogs} onBlogClick={handleBlogClick} />
        )}
      </div>

      {selectedBlog && (
        <BlogDetail blog={selectedBlog} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
