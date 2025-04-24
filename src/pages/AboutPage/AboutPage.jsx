// src/pages/ContactPage/ContactPage.jsx
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <h1>About</h1>
        <p>This is the About page.</p>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
