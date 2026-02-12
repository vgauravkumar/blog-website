import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBlogForm from './EditBlogForm';
import '../styles/MyBlogs.css';

function MyBlogs({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/blogs/user/my-blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to load your blogs');
      console.error('Error fetching user blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } catch (err) {
        setError('Failed to delete blog');
        console.error('Error deleting blog:', err);
      }
    }
  };

  const handleEditSuccess = (updatedBlog) => {
    setBlogs(blogs.map(blog => (blog._id === updatedBlog._id ? updatedBlog : blog)));
    setEditingBlog(null);
  };

  if (editingBlog) {
    return (
      <EditBlogForm
        blog={editingBlog}
        onSuccess={handleEditSuccess}
        onCancel={() => setEditingBlog(null)}
      />
    );
  }

  return (
    <div className="my-blogs-container">
      <h2>My Blog Posts</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading && <div className="loading">Loading your blogs...</div>}

      {!loading && blogs.length === 0 && (
        <div className="no-blogs">
          <p>You haven't written any blogs yet. Start writing to share your knowledge!</p>
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="my-blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="my-blog-card">
              <div className="blog-header">
                <div>
                  <h3>{blog.title}</h3>
                  <p className="date">
                    📅 {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="excerpt">{blog.excerpt}</p>

              <div className="blog-actions">
                <button
                  className="btn-edit"
                  onClick={() => setEditingBlog(blog)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBlogs;
