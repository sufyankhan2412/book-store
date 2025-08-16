import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>Readify</h3>
          <p>&copy; 2025 Readify. All rights reserved.</p>
        </div>
        <div className="footer-center">
          <p>Follow us on:</p>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <p>Contact Us</p>
          <p>Email: support@readify.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
