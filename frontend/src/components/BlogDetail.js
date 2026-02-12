import React from 'react';

function BlogDetail({ blog, onClose }) {
  const authorName = typeof blog.author === 'object' ? blog.author.name : blog.authorName;
  const dateString = blog.createdAt || blog.date;
  const date = new Date(dateString).toLocaleDateString();

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{blog.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="blog-meta">
          <span className="author">✍️ {authorName}</span>
          <span className="date">📅 {date}</span>
        </div>

        <div className="blog-content">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
