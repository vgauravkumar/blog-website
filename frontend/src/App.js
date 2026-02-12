import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Login from './components/Login';
import Register from './components/Register';
import BlogForm from './components/BlogForm';
import MyBlogs from './components/MyBlogs';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [currentView, setCurrentView] = useState('feed'); // 'feed', 'write', or 'my-blogs'

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to load blogs. Please make sure the backend server is running on port 5001.');
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

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setAuthMode('login');
    setCurrentView('feed');
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setAuthMode('login');
    setCurrentView('feed');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('feed');
    fetchBlogs();
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    setCurrentView('feed');
  };

  // If user is not logged in, show auth forms
  if (!user) {
    return (
      <div className="App">
        <header>
          <h1>📚 My Blog</h1>
          <p>Sharing knowledge about web development and programming</p>
        </header>
        
        <div className="container">
          <div className="auth-toggle">
            <button
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => setAuthMode('register')}
            >
              Register
            </button>
          </div>

          {authMode === 'login' ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register onRegisterSuccess={handleRegisterSuccess} />
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="public-blogs">
              <h3>Latest Blog Posts</h3>
              <BlogList blogs={blogs} onBlogClick={handleBlogClick} />
            </div>
          )}
        </div>

        {selectedBlog && (
          <BlogDetail blog={selectedBlog} onClose={handleCloseDetail} />
        )}
      </div>
    );
  }

  // If user is logged in, show main app
  return (
    <div className="App">
      <header>
        <div className="header-content">
          <div>
            <h1>📚 My Blog</h1>
            <p>Sharing knowledge about web development and programming</p>
          </div>
          <div className="user-menu">
            <span>Welcome, {user.name}!</span>
            <button className="btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <nav className="nav-menu">
          <button
            className={currentView === 'feed' ? 'active' : ''}
            onClick={() => setCurrentView('feed')}
          >
            📖 Feed
          </button>
          <button
            className={currentView === 'write' ? 'active' : ''}
            onClick={() => setCurrentView('write')}
          >
            ✍️ Write
          </button>
          <button
            className={currentView === 'my-blogs' ? 'active' : ''}
            onClick={() => setCurrentView('my-blogs')}
          >
            📋 My Blogs
          </button>
        </nav>
      </header>

      <div className="container">
        {currentView === 'feed' && (
          <>
            {loading && <div className="loading">Loading blogs...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
              <BlogList blogs={blogs} onBlogClick={handleBlogClick} />
            )}
          </>
        )}

        {currentView === 'write' && (
          <BlogForm onBlogCreated={handleBlogCreated} />
        )}

        {currentView === 'my-blogs' && (
          <MyBlogs user={user} />
        )}
      </div>

      {selectedBlog && (
        <BlogDetail blog={selectedBlog} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
