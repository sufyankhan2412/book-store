import React from 'react';
import './HomePage.css';

import Navbar from '../../components/Navbar/Navbar';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <div style={{ padding: 20, background: 'yellow' }}>🚀 HomePage Loaded!</div>
      {/* Site Header */}
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Creative Vision Section */}
      <section className="creative-vision">
        <div className="text-content">
          <h4>CREATIVE VISION</h4>
          <h2>We Collect & Publish Books</h2>
          <p>
            Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
            aut odit aut fugit sed quia.
          </p>
          <button className="cta-button">About Us</button>
        </div>
        <div className="media-content">
          <img src="library.jpeg" alt="Bookshelf" className="background-image" />
          <div className="video-wrapper">
            <img src="blog19.jpg" alt="Library" className="thumbnail" />
            <a
              href="https://player.vimeo.com/video/444825944?h=74d9b29d04"
              className="play-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶
            </a>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="shop-section">
        <div className="shop">
          <h4>OUR SHOP</h4>
          <h2>Read These Books & Start a New Life</h2>
          <div className="book-grid">
            {/* Repeat this .book-item for each book */}
            <div className="book-item">
              <div className="book-image">
                <img src="book9.jpg" alt="The Kite Runner"/>
                <div className="icon-container">
                  <button className="icon-btn"><i className="fas fa-heart"></i></button>
                  <button className="icon-btn"><i className="fas fa-shopping-bag"></i></button>
                  <button className="icon-btn"><i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
              <h3>The Kite Runner</h3>
              <p>KHALED HOSSEINI</p>
            </div>
            {/* ...other book-items... */}
          </div>
          <button className="cta-button">View More Books</button>
        </div>
      </section>

      {/* Blog Updates Section */}
      <section className="blog-updates">
        <h3 className="section-subtitle">WHAT'S NEW</h3>
        <h2 className="section-title">Blog Updates</h2>
        <div className="blog-container">
          <div className="blog-main">
            <img
              src="blog17.jpg"
              alt="Book on Beach"
              className="blog-main-image"
            />
            <span className="blog-label">UPDATES</span>
            <p className="image-text">WHAT DO YOU NEED FOR A CALM AND RELAXING VACATION</p>
            <p>
              Growing in excellence, but undergoing hardship and pain at work. 
              For even the least effort is acceptable.
            </p>
          </div>
          <div className="blog-list">
            <div className="blog-item">
              <img src="home-blog.jpeg" alt="Blog 1" className="blog-thumbnail" />
              <div className="blog-content">
                <span className="blog-category">UPDATES • Mar 13, 2020</span>
                <h3 className="blog-title">Start your day properly with the hottest novelties</h3>
              </div>
            </div>
            {/* ...other blog-items... */}
          </div>
        </div>
      </section>

      {/* Offer / Gallery Section */}
      <section className="offer-section">
        <h4>What We Offer</h4>
        <h2>Photo Gallery</h2>
        <div className="gallery">
          {/* Repeat .gallery-item */}
          <div className="gallery-item">
            <img src="blog1.jpg" alt="Popular Novels"/>
            <div className="overlay">
              <h3>Popular Novels</h3>
              <p>Literature</p>
            </div>
          </div>
          {/* ...other gallery-items... */}
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
