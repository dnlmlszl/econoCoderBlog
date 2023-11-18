import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BlogProvider } from './context/blogContext.jsx';
import CookieBanner from './components/CookieBanner.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogProvider>
      <App />
      <CookieBanner />
    </BlogProvider>
  </React.StrictMode>
);
