import React, { useEffect } from "react";
import './BlogGallery.css';

const BlogGallery = () => {
  useEffect(() => {
    // Shrink Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
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

      // Show/hide Scroll to Top button
      if (scrollToTopBtn) {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
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
    <div>
      <div class="container">
    <p><h1 class="title">Top successful author collabs in 2019-2020</h1></p>
    <div class="author-info">
        <img src="pg5.jpeg" alt="Author Image"></img>
        <span class="author-name">ASHTON PORTER</span>
        <span class="dot">•</span>
        <span class="date">Mar 24, 2020</span>
        <span class="dot">•</span>
        <span class="comments">0 Comments</span>
    </div>
</div>

   
{/* Hero Slider */}

<section className="hero-slider">
        <div className="hero-slide active">
          <div className="hero-overlay"></div>
          <div className="hero-content">
          </div>
          <img
            src="blog9.jpg"
            alt="Hero Image 1"
            className="hero-image"
          />
        </div>
        <div className="hero-slide">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            
          </div>
          <img
            src="blog10.jpg"
            alt="Hero Image 2"
            className="hero-image"
          />
        </div>
        <div className="hero-slide">
          <div className="hero-overlay"></div>
          <div className="hero-content">
       
          </div>
          <img
            src="blog11.jpg"
            alt="Hero Image 3"
            className="hero-image"
          />
        </div>

        <button className="slider-btn left-btn">&#10094;</button>
        <button className="slider-btn right-btn">&#10095;</button>
      </section>
      
      <div className="article-content">
      
        <div className="quote-container"></div>
        <p>
        <span className="dropcap">Q</span>
        <span className="quote-text">
          Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget
          viverra egestas nisi in consequat. Fusce sodales augue a accumsan. Cras
          sollicitudin, ipsum eget blandit pulvinar. Integer tincidunt. Cras dapibus.
          Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
          ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        </span>
      </p>
       
        <p>
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium,
          doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
        </p>
        <h1>At vero eos et accusam</h1>
        <p> Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
        totam rem aperiam eaque ipsa,quae ab illo inventore veritatis et quasi architecto beatae
         vitae dicta sunt.</p>
         <section className="image-grid">
        <div className="grid-item">
          <img src="blog7.jpeg" alt="Image 1" />
        </div>
        <div className="grid-item">
          <img src="pg6.jpeg" alt="Image 2" />
        </div>
      </section>
      <p> Ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
      totam rem aperiam eaque ipsa,quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt, explicabo.</p>
        <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
         totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto
         beatae vitae dicta sunt, explicabo.</p>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
           ex ea commodo consequat. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet,
           consectetur adipiscing elit.</p>
        <blockquote>
          Curabitur varius eros et lacus rutrum consequat. Mauris sollicitudin enim
          condimentum, luctus justo non, molestie nisl.
        </blockquote>
        
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <h1>Creative approach to every project</h1>
        <p>
        Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
         turpis egestas. Fusce gravida, ligula non molestie tristique, justo elit blandit risus, blandit maximus 
         augue magna accumsan ante.Duis id mi tristique, pulvinar neque at, lobortis tortor.
         
        </p>
      </div>
      <section className="image-grid">
        <div className="grid-item">
          <img src="blog12.jpg" alt="Image 1" />
         <p>Stet clita kasd gubergren, no sea sanctus est labore et dolore. By Kevin Smith</p> 
        </div>
        
      </section>
      <div className="article-content">
       
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        
        <p>
        Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, 
        vel rutrum erat commodo ut. Praesent finibus congue euismod.
        Nullam scelerisque massa vel augue placerat, a tempor sem egestas.
        Curabitur placerat finibus lacus.
        </p>
      </div>
      {/* Buttons for Filtering */}
      <p>____________________________________________________________________________________________________________________________________________________________</p>
      <div className="article-navigation">
      <div className="prev-next">
        <a href="#" className="prev">
          <span>❮ PREVIOUS</span>
          <p>Simple things as a book and a cup of tea make us happier</p>
        </a>
        <a href="#" className="next">
          <span>NEXT ❯</span>
          <p>How to avoid the most boring books ever</p>
        </a>
      </div>

      <div className="author-box">
        <img src="pg5.jpeg" alt="Ashton Porter" className="author-img" />
        <div className="author-info">
          <h3>Ashton Porter</h3>
          <p className="about-author">ABOUT AUTHOR</p>
          <p className="author-bio">
            Phasellus et ipsum justo. Aenean fringilla a fermentum mauris non venenatis.
            Praesent at nulla aliquam ligula.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Dribbble"><i className="fab fa-dribbble"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div className="article-content">
        <h1>Leave a comment</h1>
        <p>
       You must be logged in to post a comment.
        </p>
        <h1>You May Also Like</h1>
        </div>

        <div class="container4">
        
        <div class="gallery">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQT2k9e7EmuqcVI29N80AoE4nQI3U-x8Ecog&s" alt=""></img>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPsX3_p9s80hH1lFhWTaC_m14RF5RGVO-fag&s" alt="r"></img>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo63MtAjmao7TUWhJEgvKySifsWmrm2wLkEg&s" alt=""></img>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Qf3__cihJDQ76QnipyjguOa7Ik8U7vjBTw&s" alt=""></img>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyz5Klx4hDK9uWAWeIBfIcFRf7729RvEBLig&s" alt="r"></img>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczhg95EjX1Nc4xR3H9cVDl1BdfSKfIDpBBQ&s" alt=""></img>
  <p>Photoshoot of the products we stock</p>
</div>
        
<div class="podcast-container">
  <div class="podcast-image">
    <img src="blog13.jpg" alt="Podcast Cover"></img>
  </div>
  <div class="podcast-info">
    <p>Modern podcasts for literature lovers</p>
    
  </div>
</div>

    </div>
<div class="reading-container2">
    <button class="reading-btn2" onclick="goToPage('page1.html')">FORMATS</button>
    <button class="reading-btn2" onclick="goToPage('page2.html')">FORMATS</button>
</div>

    </div>
  );
};

export default BlogGallery;