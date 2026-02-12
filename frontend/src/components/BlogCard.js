import React from 'react';

function BlogCard({ blog, onClick }) {
  const authorName = typeof blog.author === 'object' ? blog.author.name : blog.authorName;
  const dateString = blog.createdAt || blog.date;
  const date = new Date(dateString).toLocaleDateString();

  return (
    <div className="blog-card" onClick={onClick}>
      <h2>{blog.title}</h2>
      <div className="blog-meta">
        <span className="author">✍️ {authorName}</span>
        <span className="date">📅 {date}</span>
      </div>
      <p className="blog-excerpt">{blog.excerpt}</p>
      <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); onClick(); }}>
        Read More →
      </a>
    </div>
  );
}

export default BlogCard;
