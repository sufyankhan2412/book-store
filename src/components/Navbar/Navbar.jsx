import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaInfoCircle, 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaDribbble, 
  FaInstagram, 
  FaGlobe, 
  FaShoppingBag 
} from "react-icons/fa";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <h1 className="logo">READIFY</h1>

      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li className="dropdown">
          <span>Pages</span>
          <ul className="dropdown-menu">
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/typography">Typography</Link></li>
            <li><Link to="/shortcodes">Shortcodes</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/service-plus">Service Plus</Link></li>
          </ul>
        </li>

        <li className="dropdown-blog">
          <span>Blog</span>
          <ul className="dropdown-menu-blog">
            <li className="dropdown-section-blog">
              <span className="section-title">Blog Styles 1</span>
              <ul className="blog-columns">
                <li><Link to="/blog-style1">Blog Style 1</Link></li>
                <li><Link to="/blog/standard">Standard</Link></li>
                <li><Link to="/blog/list">List</Link></li>
                <li><Link to="/blog/masonry-2">Masonry 2 Columns</Link></li>
                <li><Link to="/blog/masonry-3">Masonry 3 Columns</Link></li>
                <li><Link to="/blog/masonry-4">Masonry 4 Columns</Link></li>
              </ul>
            </li>
            <li className="dropdown-section-blog">
              <span className="section-title">Blog Styles 2</span>
              <ul className="blog-columns">
                <li><Link to="/blog-style2">Blog Style 2</Link></li>
                <li><Link to="/blog-gallery">Blog Gallery</Link></li>
                <li><Link to="/blog/grid-2">Grid 2 Columns</Link></li>
                <li><Link to="/blog/grid-3">Grid 3 Columns</Link></li>
                <li><Link to="/blog/grid-4">Grid 4 Columns</Link></li>
              </ul>
            </li>
            <li className="dropdown-section-blog">
              <span className="section-title">Single Posts</span>
              <ul className="blog-columns">
                <li><Link to="/post/style-1">Style 1</Link></li>
                <li><Link to="/post/style-2">Style 2</Link></li>
                <li><Link to="/post/sidebar">With Sidebar</Link></li>
                <li><Link to="/post/video">Video</Link></li>
                <li><Link to="/post/audio">Audio</Link></li>
                <li><Link to="/post/gallery">Gallery</Link></li>
              </ul>
            </li>
          </ul>
        </li>

        <li><Link to="/about">About</Link></li>

        <li className="dropdown">
          <span>Store</span>
          <ul className="dropdown-menu">
            <li><Link to="/shop">Product List</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </li>

        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login-page">Login</Link></li>
        <li><Link to="/signup-page">SignUp</Link></li>
      </ul>

      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" />
        </a>
        <Link to="/global-news">
          <FaGlobe className="social-icon" />
        </Link>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <Link to="/cart">
          <FaShoppingBag className="social-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
