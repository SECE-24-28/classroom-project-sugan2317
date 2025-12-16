# React Router Simple Project

A simple React Router application demonstrating basic routing with multiple pages.

## Features

- **Home Page**: Welcome page with introduction
- **About Page**: Information about the app
- **Contact Page**: Contact information
- **404 Page**: Catch-all route for undefined pages
- **Navigation Bar**: Easy navigation between pages
- **Responsive Design**: Mobile-friendly layout

## Project Structure

```
src/
├── App.jsx           # Main app with routing setup
├── App.css           # Application styles
├── main.jsx          # React entry point
├── index.css         # Global styles
└── pages/
    ├── Home.jsx      # Home page component
    ├── About.jsx     # About page component
    ├── Contact.jsx   # Contact page component
    └── NotFound.jsx  # 404 not found page
```

## Installation

1. Make sure you're in the `react-router-app` directory:
   ```bash
   cd "DAY 8/react-router-app"
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

## Running the Project

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Available Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `*` - Catch-all for undefined routes (404)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Technologies Used

- **React** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS** - Styling

## Learning Concepts

This project demonstrates:
- Basic routing with React Router
- Link navigation
- Route parameters (via wildcard routes)
- Component-based page structure
- Responsive navigation bar
- Footer implementation
