// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, default as AuthContext } from './context/AuthContext';
import { ShopProvider } from './context/ShopProvider';
import './App.css';

// Auth pages
import ForgotPassword from './pages/ForgotPage/ForgotPassword';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

// E-commerce pages
import Shop from './pages/ProductPage/Shop';
import Cart from './pages/CartPage/Cart';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

// Static site pages
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import EventPage from './pages/Event/EventPage';
import BlogGallery from './pages/BlogGallery/BlogGallery';
import BlogStyle1 from './pages/BlogStyle1/BlogStyle1';
import BlogStyle2 from './pages/BlogStyle2/BlogStyle2';

// Placeholder component
const Placeholder = ({ title }) => (
  <div style={{ padding: '2rem' }}>
    <h2>{title}</h2>
  </div>
);

// Import your PrivateRoute component (make sure path is correct)
import PrivateRoute from './components/PrivateRoute';

function AppRoutes() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect from '/' to either /shop (if logged in) or /login (if not)
  if (!isAuthenticated) {
    return (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup-page" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all 404 */}
        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Routes>
    );
  }

  // Authenticated routes
  return (
    <Routes>
    

      {/* E-commerce protected routes */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<Cart />} />

      {/* Static site protected routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/blog-style1" element={<BlogStyle1 />} />
      <Route path="/blog-style2" element={<BlogStyle2 />} />
      <Route path="/blog-gallery" element={<BlogGallery />} />

      {/* More placeholders */}
      <Route path="/typography" element={<Placeholder title="Typography" />} />
      <Route path="/shortcodes" element={<Placeholder title="Shortcodes" />} />
      <Route path="/faq" element={<Placeholder title="FAQ" />} />
      <Route path="/service-plus" element={<Placeholder title="Service Plus" />} />
      <Route path="/blog/standard" element={<Placeholder title="Blog - Standard" />} />
      <Route path="/blog/list" element={<Placeholder title="Blog - List" />} />
      <Route path="/blog/masonry-2" element={<Placeholder title="Blog - Masonry 2 Columns" />} />
      <Route path="/blog/masonry-3" element={<Placeholder title="Blog - Masonry 3 Columns" />} />
      <Route path="/blog/masonry-4" element={<Placeholder title="Blog - Masonry 4 Columns" />} />
      <Route path="/blog/grid-2" element={<Placeholder title="Blog - Grid 2 Columns" />} />
      <Route path="/blog/grid-3" element={<Placeholder title="Blog - Grid 3 Columns" />} />
      <Route path="/blog/grid-4" element={<Placeholder title="Blog - Grid 4 Columns" />} />
      <Route path="/post/style-1" element={<Placeholder title="Post - Style 1" />} />
      <Route path="/post/style-2" element={<Placeholder title="Post - Style 2" />} />
      <Route path="/post/sidebar" element={<Placeholder title="Post - With Sidebar" />} />
      <Route path="/post/video" element={<Placeholder title="Post - Video" />} />
      <Route path="/post/audio" element={<Placeholder title="Post - Audio" />} />
      <Route path="/post/gallery" element={<Placeholder title="Post - Gallery" />} />
      <Route path="/product-list" element={<Placeholder title="Product List" />} />
      <Route path="/product-single" element={<Placeholder title="Product Single" />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
       <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <div className="app">
            <AppRoutes />
          </div>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
