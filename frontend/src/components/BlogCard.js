import React from 'react';

function BlogCard({ blog, onClick }) {
  return (
    <div className="blog-card" onClick={onClick}>
      <h2>{blog.title}</h2>
      <div className="blog-meta">
        <span className="author">✍️ {blog.author}</span>
        <span className="date">📅 {new Date(blog.date).toLocaleDateString()}</span>
      </div>
      <p className="blog-excerpt">{blog.excerpt}</p>
      <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); onClick(); }}>
        Read More →
      </a>
    </div>
  );
}

export default BlogCard;
