import React, { useState } from "react";
import "./NewsletterSignup.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setSuccess(true);
    // Here you can add logic to send the email to a backend server
    console.log("Email submitted:", email);
  };

  return (
    <div className="newsletter-signup">
      <div className="newsletter-content">
        <h2>Sign Up for Our Newsletter</h2>
        <p>Stay updated with the latest news and offers.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="email-input"
            required
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Thank you for subscribing!</p>}
          <button type="submit" className="submit-button">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
