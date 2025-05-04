import React, { useEffect } from "react";
import './HomePage.css';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import NewsletterSignup from "../../components/NewsletterSignup/NewsletterSignup"

const HomePage = () => {
  useEffect(() => {
    // Shrink Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    const slides = document.querySelectorAll('.hero-slide');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentSlide = 0;

    const handleScroll = () => {
      // Shrink Navbar
      if (window.scrollY > 50) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    };
    
    // Slider functionality
    const showSlide = (index) => {
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      slides[index].classList.add('active');
    };
    const nextSlide = () => {
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0; // Loop back to the first slide
      }
      showSlide(currentSlide);
    };
    const prevSlide = () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1; // Loop to the last slide
      }
      showSlide(currentSlide);
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);

    if (leftBtn && rightBtn) {
      leftBtn.addEventListener('click', prevSlide);
      rightBtn.addEventListener('click', nextSlide);
    }

    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });

    return () => {
      // Cleanup event listeners and interval
      clearInterval(autoSlideInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <Navbar/>
    <div>
      {/* Hero Slider */}
      <section className="hero-slider">
        <div className="hero-slide active">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="subheading">Broden Your Horizon</p>
            <h2>Find New Life-changing Ideas with Us</h2>
            <button className="cta-button">Read More </button>
          </div>
          <img
            src="/assets/img2.jpg"
            alt="Hero Image 1"
            className="hero-image"
          />
        </div>
        <div className="hero-slide">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="subheading">EXCELLENT BOOK COLLECTION</p>
            <h2>Get Latest BestSellers or True Classics</h2>
            <button className="cta-button">Explore Now </button>
          </div>
          <img
            src="/assets/slider5.jpg"
            alt="Hero Image 2"
            className="hero-image"
          />
        </div>
        <div className="hero-slide">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="subheading">Personalized Recommendations</p>
            <h2>Discover Your Next Favorite Book</h2>
            <button className="cta-button">Get Started </button>
          </div>
          <img
            src="/assets/books.jpg"
            alt="Hero Image 3"
            className="hero-image"
          />
        </div>

        <button className="slider-btn left-btn">&#10094;</button>
        <button className="slider-btn right-btn">&#10095;</button>
      </section>

      {/* content section */}
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
        {/* Background Image */}
        <img src="/assets/library.jpeg" alt="Bookshelf" className="background-image" />

        {/* Foreground Image + Play Button */}
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
      <section class="shop-section">
          <div class="shop">
            <h4>OUR SHOP</h4>
            <h2>Read These Books & Start a New Life</h2>
            <div class="book-grid">
                <div class="book-item">
                  <div class="book-image">
                      <img src="/assets/book9.jpg" alt="So, Anyway..."/>
                      <div class="icon-container">
                          <button class="icon-btn"><i class="fas fa-heart"></i></button>
                          <button class="icon-btn"><i className="fas fa-shopping-bag"></i></button>
                          <button class="icon-btn"><i class="fas fa-arrow-right"></i></button>
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
            <button class="cta-button">View More Books</button>
          </div>
      </section>

      {/* Blog Section */}
      <section className="blog-updates">
        <h3 className="section-subtitle">WHAT'S NEW</h3>
        <h2 className="section-title">Blog Updates</h2>

        <div className="blog-container">
          {/* Left Side: Image with Text Below */}
          <div className="blog-main">
            <img
              src="/assets/blog17.jpg"
              alt="Book on Beach"
              className="blog-main-image"
              onclick="window.location.href='newScreen.html'" /* Redirect to new screen */
            />
            <span className="blog-label">UPDATES</span>
            <p className="image-text" onclick="window.location.href='newScreen.html'"> WHAT DO YOU NEED FOR A CALM AND RELAXING VACATION </p>
            <p>Growing in excellence, but undergoing hardship and pain at work. For even the least effort is acceptable</p>
          </div>

          {/* Right Side: Blog Entries */}
          <div className="blog-list">
            <div className="blog-item">
              <img src="/assets/home-blog.jpeg" alt="Blog 1" className="blog-thumbnail" />
              <div className="blog-content">
                <span className="blog-category">UPDATES • Mar 13, 2020</span>
                <h3 className="blog-title">Start your day properly with the hottest novelties</h3>
              </div>
            </div>

            <div className="blog-item">
              <img src="/assets/home-blog4.jpeg" alt="Blog 2" className="blog-thumbnail" />
              <div className="blog-content">
                <span className="blog-category">UPDATES • Mar 13, 2020</span>
                <h3 className="blog-title">Who is your favorite science fiction author?</h3>
              </div>
            </div>
            <div className="blog-item">
              <img src="/assets/home-blog2.jpeg" alt="Blog 2" className="blog-thumbnail" />
              <div className="blog-content">
                <span className="blog-category">UPDATES • Mar 13, 2020</span>
                <h3 className="blog-title">Who is your favorite science fiction author?</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <NewsletterSignup/>
      <Footer/>
    </div>
    </>
  );
};

export default HomePage;