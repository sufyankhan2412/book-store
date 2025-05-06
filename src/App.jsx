import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import EventPage from './pages/Event/EventPage';
import CartPage from "./pages/CartPage/CartPage";
import BlogGallery from "./pages/BlogGallery/BlogGallery";
import BlogStyle1 from "./pages/BlogStyle1/BlogStyle1";
import BlogStyle2 from "./pages/BlogStyle2/BlogStyle2";
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { AuthProvider } from './context/AuthContext';

const Placeholder = ({ title }) => <div style={{ padding: '2rem' }}><h2>{title}</h2></div>;

// Simulate auth check (replace with real auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // e.g., set in login/signup on success
};

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute><EventPage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          <Route path="/blog-style1" element={<PrivateRoute><BlogStyle1 /></PrivateRoute>} />
          <Route path="/blog-style2" element={<PrivateRoute><BlogStyle2 /></PrivateRoute>} />
          <Route path="/blog-gallery" element={<PrivateRoute><BlogGallery /></PrivateRoute>} />

          {/* Placeholder Routes (also protected) */}
          <Route path="/typography" element={<PrivateRoute><Placeholder title="Typography" /></PrivateRoute>} />
          <Route path="/shortcodes" element={<PrivateRoute><Placeholder title="Shortcodes" /></PrivateRoute>} />
          <Route path="/faq" element={<PrivateRoute><Placeholder title="FAQ" /></PrivateRoute>} />
          <Route path="/service-plus" element={<PrivateRoute><Placeholder title="Service Plus" /></PrivateRoute>} />
          <Route path="/blog/standard" element={<PrivateRoute><Placeholder title="Blog - Standard" /></PrivateRoute>} />
          <Route path="/blog/list" element={<PrivateRoute><Placeholder title="Blog - List" /></PrivateRoute>} />
          <Route path="/blog/masonry-2" element={<PrivateRoute><Placeholder title="Blog - Masonry 2 Columns" /></PrivateRoute>} />
          <Route path="/blog/masonry-3" element={<PrivateRoute><Placeholder title="Blog - Masonry 3 Columns" /></PrivateRoute>} />
          <Route path="/blog/masonry-4" element={<PrivateRoute><Placeholder title="Blog - Masonry 4 Columns" /></PrivateRoute>} />
          <Route path="/blog/grid-2" element={<PrivateRoute><Placeholder title="Blog - Grid 2 Columns" /></PrivateRoute>} />
          <Route path="/blog/grid-3" element={<PrivateRoute><Placeholder title="Blog - Grid 3 Columns" /></PrivateRoute>} />
          <Route path="/blog/grid-4" element={<PrivateRoute><Placeholder title="Blog - Grid 4 Columns" /></PrivateRoute>} />
          <Route path="/post/style-1" element={<PrivateRoute><Placeholder title="Post - Style 2" /></PrivateRoute>} />
          <Route path="/post/style-2" element={<PrivateRoute><Placeholder title="Post - Style 2" /></PrivateRoute>} />
          <Route path="/post/sidebar" element={<PrivateRoute><Placeholder title="Post - With Sidebar" /></PrivateRoute>} />
          <Route path="/post/video" element={<PrivateRoute><Placeholder title="Post - Video" /></PrivateRoute>} />
          <Route path="/post/audio" element={<PrivateRoute><Placeholder title="Post - Audio" /></PrivateRoute>} />
          <Route path="/post/gallery" element={<PrivateRoute><Placeholder title="Post - Gallery" /></PrivateRoute>} />
          <Route path="/ProductList" element={<PrivateRoute><Placeholder title="Product List" /></PrivateRoute>} />
          <Route path="/ProductSingle" element={<PrivateRoute><Placeholder title="Product Single" /></PrivateRoute>} />

          {/* Catch-all 404 */}
          <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
