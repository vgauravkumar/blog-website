import React from 'react';
import BlogCard from './BlogCard';

function BlogList({ blogs, onBlogClick }) {
  return (
    <div className="blog-list">
      {blogs.length === 0 ? (
        <div className="loading">No blogs available.</div>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={() => onBlogClick(blog)}
          />
        ))
      )}
    </div>
  );
}

export default BlogList;
