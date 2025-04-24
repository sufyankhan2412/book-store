import React from 'react';
import './HomePage.css';

import Navbar from '../../components/Navbar/Navbar';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import Footer from '../../components/Footer/Footer';
import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup'

const HomePage = () => {
  return (
    <>
      {/* Site Header */}
      <Navbar />

      {/* Site Header */}
      <HeroSlider/>

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
          <img src="/assets/library.jpeg" alt="Bookshelf" className="background-image" />
          <div className="video-wrapper">
            <img src="/assets/blog19.jpg" alt="Library" className="thumbnail" />
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
                <img src="/assets/book9.jpg" alt="The Kite Runner"/>
                <div className="icon-container">
                  <button className="icon-btn"><i className="fas fa-heart"></i></button>
                  <button className="icon-btn"><i className="fas fa-shopping-bag"></i></button>
                  <button className="icon-btn"><i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
              <h3>The Kite Runner</h3>
              <p>KHALED HOSSEINI</p>
            </div>
            <div class="book-item">
                    <div class="book-image">
                        <img src="/assets/book8.jpg" alt="Enough About Me"/>
                        <div class="icon-container">
                            <button class="icon-btn"><i class="fas fa-heart"></i></button>
                            <button class="icon-btn"><i className="fas fa-shopping-bag"></i></button>
                            <button class="icon-btn"><i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <h3>IKIGAI</h3>
                    <p>HECTOR GRACIA</p>
                </div>
                <div class="book-item">
                    <div class="book-image">
                        <img src="/assets/book6.jpg" alt="His Story"/>
                        <div class="icon-container">
                            
                            <button class="icon-btn"><i class="fas fa-heart"></i></button>
                            <button class="icon-btn"><i className="fas fa-shopping-bag"></i></button>
                            <button class="icon-btn"><i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <h3>The Forty Rules of Love</h3>
                    <p>ELIF SHAFAK</p>
                </div>
                <div class="book-item">
                    <div class="book-image">
                        <img src="/assets/book7.jpg" alt="White Teeth"/>
                        <div class="icon-container">
                            <button class="icon-btn"><i class="fas fa-heart"></i></button>
                            <button class="icon-btn"><i className="fas fa-shopping-bag"></i></button>
                            <button class="icon-btn"><i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <h3>Think and Grow Rich</h3>
                    <p>NAPOLEON HILL</p>
                </div>
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
              src="public\assets\blog17.jpg"
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
              <img src="/assets/home-blog.jpeg" alt="Blog 1" className="blog-thumbnail" />
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
      <section class="offer-section">
          <h4>What We Offer</h4>
          <h2>Photo Gallery</h2>
          
          <div class="gallery">
              <div class="gallery-item">
                  <img src="/assets/blog1.jpg" alt="Category 1"/>
                  <div class="overlay">
                      <h3>Popular Novels</h3>
                      <p>Literature</p>
                  </div>
              </div>
              <div class="gallery-item">
                  <img src="/assets/blog2.jpg" alt="Category 2"/>
                  <div class="overlay">
                      <h3>Classic Literature</h3>
                      <p>Literature</p>
                  </div>
              </div>
              <div class="gallery-item">
                  <img src="/assets/blog16.jpg" alt="Category 3"/>
                  <div class="overlay">
                      <h3>Fantasy</h3>
                      <p>Literature</p>
                  </div>
              </div>
              <div class="gallery-item">
                  <img src="/assets/blog17.jpg" alt="Category 4"/>
                  <div class="overlay">
                      <h3>Drama & Romance</h3>
                      <p>Literature</p>
                  </div>
              </div>
              <div class="gallery-item">
                  <img src="/assets/blog18.jpg" alt="Category 5"/>
                  <div class="overlay">
                      <h3>Humor</h3>
                      <p>Literature</p>
                  </div>
              </div>
              <div class="gallery-item">
                  <img src="/assets/blog19.jpg" alt="Category 6"/>
                  <div class="overlay">
                      <h3>Poetry & plays</h3>
                      <p>Literature</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Site Header */}
      <NewsletterSignup/>

      {/* Site Header */}
      <Footer/>

    </>
  );
};

export default HomePage;
