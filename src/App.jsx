import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your actual page components here
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import EventPage from './pages/Event/EventPage';
import CartPage from "./pages/CartPage/CartPage";
import BlogGallery from "./pages/BlogGallery/BlogGallery";
import BlogStyle1 from "./pages/BlogStyle1/BlogStyle1";
import BlogStyle2 from "./pages/BlogStyle2/BlogStyle2";

// Placeholder components for extra routes
const Placeholder = ({ title }) => <div style={{ padding: '2rem' }}><h2>{title}</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Pages dropdown */}
        <Route path="/events" element={<EventPage/>} />
        <Route path="/typography" element={<Placeholder title="Typography" />} />
        <Route path="/shortcodes" element={<Placeholder title="Shortcodes" />} />
        <Route path="/faq" element={<Placeholder title="FAQ" />} />
        <Route path="/service-plus" element={<Placeholder title="Service Plus" />} />

        {/* Blog Styles 1 */}
        <Route path="/blog-style1" element={<BlogStyle1 />} />
        <Route path="/blog/standard" element={<Placeholder title="Blog - Standard" />} />
        <Route path="/blog/list" element={<Placeholder title="Blog - List" />} />
        <Route path="/blog/masonry-2" element={<Placeholder title="Blog - Masonry 2 Columns" />} />
        <Route path="/blog/masonry-3" element={<Placeholder title="Blog - Masonry 3 Columns" />} />
        <Route path="/blog/masonry-4" element={<Placeholder title="Blog - Masonry 4 Columns" />} />

        {/* Blog Styles 2 */}
        <Route path="/blog-style2" element={<BlogStyle2 />} /> 
        <Route path="/blog-gallery" element={<BlogGallery />} />
        <Route path="/blog/grid-2" element={<Placeholder title="Blog - Grid 2 Columns" />} />
        <Route path="/blog/grid-3" element={<Placeholder title="Blog - Grid 3 Columns" />} />
        <Route path="/blog/grid-4" element={<Placeholder title="Blog - Grid 4 Columns" />} />

        {/* Single Posts */}
        <Route path="/post/style-1" element={<Placeholder title="Post - Style 2" />} />
        <Route path="/post/style-2" element={<Placeholder title="Post - Style 2" />} />
        <Route path="/post/sidebar" element={<Placeholder title="Post - With Sidebar" />} />
        <Route path="/post/video" element={<Placeholder title="Post - Video" />} />
        <Route path="/post/audio" element={<Placeholder title="Post - Audio" />} />
        <Route path="/post/gallery" element={<Placeholder title="Post - Gallery" />} />

        {/* Store Pages */}
        <Route path="/ProductList" element={<Placeholder title="Product List" />} />
        <Route path="/ProductSingle" element={<Placeholder title="Product Single" />} />
        <Route path="/cart" element={<CartPage />} /> 

        {/* 404 Page */}
        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Routes>
    </Router>
  );
}

export default App;
