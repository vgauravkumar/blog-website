import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BlogForm.css';

function BlogForm({ onBlogCreated }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/blogs',
        { title, excerpt, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Blog post created successfully!');
      setTitle('');
      setExcerpt('');
      setContent('');

      setTimeout(() => {
        setSuccess('');
        onBlogCreated(response.data);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-container">
      <h2>Write a New Blog Post</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Excerpt (short summary)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
