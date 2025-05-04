import React, { useEffect } from "react";

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
    FaInstagram 
  } from "react-icons/fa";
import './ContactPage.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const ContactPage = () => {
  useEffect(() => {
    // Shrink Navbar on Scroll
    const navbar = document.querySelector('.navbar');
   // let currentSlide = 0;

    const handleScroll = () => {
      // Shrink Navbar
      if (window.scrollY > 50) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup event listeners and interval
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
   <>
    <Navbar />
    <div>
    {/* CONTACT PIC */}
    <section className="CONTACT-UP">
        <h1>CONTACT</h1>
    </section>
    
      {/* Contact Details Section */}
    <section className="contacts-container">
      <div className="container">
        
        {/* Left - Contact Details */}
        <div className="contact-details">
          <h2 className="section-title">Contact Details</h2>
          <p className="contact-text"><FaMapMarkerAlt /> 785 15th Street, Office 478</p>
          <p className="contact-text">Berlin, DE 81566</p>
          <p className="contact-text">info@email.com</p>
          <p className="contact-text contact-bold">+1 840 841 25 69</p>
          
          {/* Social Icons */}
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaDribbble /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="contact-form">
          <h2 className="section-title">Get In Touch</h2>
          <form className="form-container">
            
            {/* Name */}
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Name" required className="form-input" />
            </div>

            {/* Email */}
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Email Address" required className="form-input" />
            </div>

            {/* Phone */}
            <div className="input-group">
              <FaPhone className="input-icon" />
              <input type="tel" placeholder="Phone" required className="form-input" />
            </div>

            {/* Subject */}
            <div className="input-group">
              <FaInfoCircle className="input-icon" />
              <input type="text" placeholder="Subject" required className="form-input" />
            </div>

            {/* Message */}
            <div className="input-group">
              <FaPaperPlane className="input-icon" />
              <textarea placeholder="How can we help you? Feel free to get in touch!" required className="form-textarea"></textarea>
            </div>

            {/* Checkbox */}
            <div className="checkbox-container">
              <input type="checkbox" id="agree" className="checkbox" />
              <label htmlFor="agree" className="checkbox-label">
                I agree that my data is <a href="#">collected and stored</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="form-button">
              <FaPaperPlane className="button-icon" /> Get In Touch
            </button>
          </form>
        </div>
      </div>
    </section>

      {/* About Us Section */}
    <section className="about-us">
        <h2>We Create Comfy Atmosphere for You</h2>
        <button className="about-btn">About Us</button>
    </section>

    </div>
    <Footer />
    </>
  );
};

export default ContactPage;