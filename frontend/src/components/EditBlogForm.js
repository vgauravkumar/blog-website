import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EditBlogForm.css';

function EditBlogForm({ blog, onSuccess, onCancel }) {
  const [title, setTitle] = useState(blog.title);
  const [excerpt, setExcerpt] = useState(blog.excerpt);
  const [content, setContent] = useState(blog.content);
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
      const response = await axios.put(
        `/api/blogs/${blog._id}`,
        { title, excerpt, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Blog post updated successfully!');
      setTimeout(() => {
        onSuccess(response.data);
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-blog-form-container">
      <h2>Edit Blog Post</h2>
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
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-save">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel" disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlogForm;
