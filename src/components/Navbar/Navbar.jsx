// src/components/Navbar/Navbar.jsx
import React, { useEffect } from 'react';
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
        <li className="dropdown">
          <a href="#">Home</a>
        </li>

        <li className="dropdown">
          <a href="#">Pages</a>
          <ul className="dropdown-menu">
            <li><a href="#">Events</a></li>
            <li><a href="#">Typography</a></li>
            <li><a href="#">Shortcodes</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Service Plus</a></li>
          </ul>
        </li>

        <li className="dropdown-blog">
          <a href="#">Blog</a>
          <ul className="dropdown-menu-blog">
            <li className="dropdown-section-blog">
              <span className="section-title">Blog Styles 1</span>
              <ul className="blog-columns">
                <li><a href="#">Standard</a></li>
                <li><a href="#">List</a></li>
                <li><a href="#">Masonry 2 Columns</a></li>
                <li><a href="#">Masonry 3 Columns</a></li>
                <li><a href="#">Masonry 4 Columns</a></li>
              </ul>
            </li>
            <li className="dropdown-section-blog">
              <span className="section-title">Blog Styles 2</span>
              <ul className="blog-columns">
                <li><a href="#">Portfolio 3 Columns</a></li>
                <li><a href="#">Portfolio 4 Columns</a></li>
                <li><a href="#">Grid 2 Columns</a></li>
                <li><a href="#">Grid 3 Columns</a></li>
                <li><a href="#">Grid 4 Columns</a></li>
              </ul>
            </li>
            <li className="dropdown-section-blog">
              <span className="section-title">Single Posts</span>
              <ul className="blog-columns">
                <li><a href="#">Style 1</a></li>
                <li><a href="#">Style 2</a></li>
                <li><a href="#">With Sidebar</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Audio</a></li>
                <li><a href="#">Gallery</a></li>
              </ul>
            </li>
          </ul>
        </li>

        <li><a href="#">About Us</a></li>

        <li className="dropdown">
          <a href="#">Store</a>
          <ul className="dropdown-menu">
            <li><a href="#">Store 1</a></li>
            <li><a href="#">Store 2</a></li>
            <li><a href="#">Store 3</a></li>
          </ul>
        </li>

        <li>
          <a href="#">Contacts</a>
        </li>
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
