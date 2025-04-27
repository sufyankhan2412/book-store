import React, { useEffect } from "react";
import './BlogStyle1.css';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const BlogStyle1 = () => {
  useEffect(() => {
    // Shrink Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    
      <>
      <Navbar/>
      <div>
        {/* Hero Section (Single Image) */}
      <section className="hero-slider">
        <div className="hero-slide active">
          <div className="hero-overlay"></div>
          <div className="hero-content"></div>
          <img src="/assets/blog4.jpeg" alt="Hero Image" className="hero-image" />
        </div>
      </section>

      <div className="article-content">
        <h1>True factors of a successful scientific project </h1>
        <center> <p>Ashton Porter Apr 21, 2020 0Comments</p></center>
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

        <blockquote>
          Curabitur varius eros et lacus rutrum consequat. Mauris sollicitudin enim
          condimentum, luctus justo non, molestie nisl.
        </blockquote>
        
        <p>
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt.
        </p>
        
        <p>
          Ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
        </p>
      </div>
      <section className="image-grid">
        <div className="grid-item">
          <img src="/assets/pg6.jpeg" alt="Image 1" />
        </div>
        <div className="grid-item">
          <img src="/assets/pg4.jpeg" alt="Image 2" />
        </div>
        <div className="grid-item">
          <img src="/assets/pg5.jpeg" alt="Image 3" />
        </div>
      </section>
      <div className="article-content">
        <h1>Creative approach to every project</h1>
       
       
        <p>
        Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus 
        et netus et malesuada fames ac turpis egestas.
        Fusce gravida, ligula non molestie tristique, justo elit blandit risus,
        blandit maximus augue magna accumsan ante. Duis id mi tristique,
        pulvinar neque at, lobortis tortor.
        </p>
        
        <p>
        Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, 
        vel rutrum erat commodo ut. Praesent finibus congue euismod.
        Nullam scelerisque massa vel augue placerat, a tempor sem egestas.
        Curabitur placerat finibus lacus.
        </p>
      </div>
      {/* Buttons for Filtering */}
      <div className="button-container">
        <button className="filter-btn">Creative</button>
        <button className="filter-btn">Featured</button>
      </div>
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
        <img src="/assets/pg5.jpeg" alt="Ashton Porter" className="author-img" />
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
        <div className="article-container2">
  <img src="/assets/blog1.jpg" alt="Article 1" className="article-image2" />
  <img src="/assets/blog2.jpg" alt="Article 2" className="article-image2" />
</div>
<div class="reading-container2">
    <button class="reading-btn2" onclick="goToPage('page1.html')">READING</button>
    <button class="reading-btn2" onclick="goToPage('page2.html')">READING</button>
</div>
    </div>
    <Footer/>
    </>
      
  );
};

export default BlogStyle1;