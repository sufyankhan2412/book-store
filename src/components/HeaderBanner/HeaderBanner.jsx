// src/components/HeaderBanner.jsx
import React from 'react';
import './HeaderBanner.css'; // style it as needed

const HeaderBanner = ({ title }) => {
  return (
    <div className="header-banner">
      <img
        src="/assets/blog9.jpg"
        alt="Banner"
        className="banner-image"
      />
      <div className="banner-text">
        <h1>{title}</h1>
        <span className="down-arrow">⌄</span>
      </div>
    </div>
  );
};

export default HeaderBanner;
