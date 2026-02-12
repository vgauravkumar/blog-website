# Blog Website - Full Stack Application

A simple blog website built with Node.js (backend) and React (frontend).

## Project Structure

```
blog-website/
├── backend/          # Node.js Express server
│   ├── package.json
│   ├── server.js     # Main server file with hardcoded blog posts
│   └── .gitignore
└── frontend/         # React application
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── BlogCard.js      # Blog post card component
    │   │   ├── BlogDetail.js     # Full blog post modal
    │   │   └── BlogList.js       # List of blog posts
    │   ├── App.js                # Main app component
    │   ├── index.js              # React entry point
    │   └── index.css             # Styling
    ├── package.json
    └── .gitignore
```

## Features

- ✅ Fetch blog posts from backend API
- ✅ Display blog posts in a responsive grid layout
- ✅ Click on blog post to view full content in a modal
- ✅ Hardcoded blog posts with sample data
- ✅ Clean and modern UI with CSS styling
- ✅ Error handling for failed API requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd blog-website/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will start on `http://localhost:5001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd blog-website/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open in your browser at `http://localhost:3000`

## API Endpoints

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog post by ID
- `GET /api/health` - Health check endpoint

## Sample Blog Posts

The backend comes with 5 hardcoded blog posts covering:
1. Getting Started with Node.js
2. React Hooks: A Complete Guide
3. Building REST APIs with Express
4. CSS Grid vs Flexbox
5. Understanding Async/Await in JavaScript

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start server with nodemon (requires nodemon to be installed)

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Future Enhancements

- Add database integration (MongoDB/PostgreSQL)
- User authentication
- Create new blog posts functionality
- Comment system
- Search and filter features
- Blog post categories/tags
- Admin dashboard

## License

MIT
