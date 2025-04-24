import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

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
        <li><Link to="/">Home</Link></li>

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
                <li><Link to="/blog/portfolio-3">Portfolio 3 Columns</Link></li>
                <li><Link to="/blog/portfolio-4">Portfolio 4 Columns</Link></li>
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
            <li><Link to="/ProductList">Product List</Link></li>
            <li><Link to="/ProductSingle">Product Single</Link></li>
            <li><Link to="/Cart">Cart</Link></li>
          </ul>
        </li>

        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="social-icons">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fas fa-globe"></i>
        <i className="fab fa-instagram"></i>
        <i className="fas fa-shopping-bag"></i>
      </div>
    </nav>
  );
};

export default Navbar;
