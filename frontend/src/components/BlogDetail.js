import React from 'react';

function BlogDetail({ blog, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{blog.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="blog-meta">
          <span className="author">✍️ {blog.author}</span>
          <span className="date">📅 {new Date(blog.date).toLocaleDateString()}</span>
        </div>

        <div className="blog-content">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
