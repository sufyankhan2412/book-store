import React, { useEffect, useRef, useState } from "react";
import './AboutPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/contact');
  };
  const testimonialsRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // State to handle hiding

  useEffect(() => {
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('shrink');
      } else {
        navbar?.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (testimonialsRef.current && prevBtnRef.current && nextBtnRef.current) {
      let index = 0;
      const cardWidth = 270;

      const slide = (direction) => {
        if (isTransitioning) return; // Prevent multiple rapid clicks
        setIsTransitioning(true);

        setTimeout(() => {
          if (direction === "next" && index < testimonialsRef.current.children.length - 1) {
            index++;
          } else if (direction === "prev" && index > 0) {
            index--;
          }
          testimonialsRef.current.style.transform = `translateX(-${index * cardWidth}px)`;

          setTimeout(() => {
            setIsTransitioning(false); // Re-enable visibility after animation
          }, 500); // Adjust to match CSS transition
        }, 100); 
      };

      nextBtnRef.current.addEventListener("click", () => slide("next"));
      prevBtnRef.current.addEventListener("click", () => slide("prev"));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTransitioning]);

  return (
    <>
    <div>
      <Navbar/>
      <section className="About-UP">
        <h1>About Us</h1>
        <img src="/assets/blog6.jpg" />
      </section>

      <div className="container">
        <div className="text-section">
          <p>WHAT WE DO</p>
          <h1>We collect tons of books. Explore the online library now.</h1>
          <img src="/assets/img4.jpg" alt="Old Man Reading" />
        </div>

        <div className="image-section">
          <img src="/assets/blog3.jpg" alt="Book Collection" />
          <p>A wide range of books on various topics for all ages.</p>
        </div>
      </div>

      <section class="hero">
        <div class="overlay"></div>
        <div class="hero-content">
            <p class="small-text">START READING!</p>
            <h1>The World of Adventure and Thrill Awaits You on Every Page</h1>
            <button className="cta-button" onClick={handleLearnMore}>
            Learn More 
          </button>
        </div>
      </section>
      
      <div className="container-feed">
        <div className="left-section">
          <h5>TESTIMONIALS</h5>
          <h2>Suggestions & Feedback</h2>
          <div className="arrows">
            <button className="arrow-btn" ref={prevBtnRef}>&#8592;</button>
            <button className="arrow-btn" ref={nextBtnRef}>&#8594;</button>
          </div>
        </div>

        <div className={`testimonials ${isTransitioning ? 'hide' : ''}`} ref={testimonialsRef}>
          {[
            { name: "Yahya Abbasi", role: "User", feedback: "Well-Organized! The website design is neat, and I love how books are categorized. The search function is also very helpful!", img: "pg5.jpeg" },
            { name: "Abu Bakar", role: "Expert", feedback: "A fantastic platform for book lovers. The UI is intuitive, and recommendations are spot on!", img: "pg5.jpeg" },
            { name: "Aisha Khan", role: "Author", feedback: "A great place to showcase my books and interact with readers.", img: "pg5.jpeg" },
            { name: "Ali Raza", role: "Librarian", feedback: "The cataloging system is excellent, making book management effortless.", img: "pg5.jpeg" }
          ].map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote">&#8220;</div>
              <p>{testimonial.feedback}</p>
              <div className="user">
                <img src={testimonial.img} alt={testimonial.name} />
                <div>
                  <strong>{testimonial.name}</strong>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;