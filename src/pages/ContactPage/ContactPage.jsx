// src/pages/ContactPage/ContactPage.jsx
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Contact</h1>
        <p>This is the Contact page.</p>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
