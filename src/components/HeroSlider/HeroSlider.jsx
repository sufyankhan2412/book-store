import React, { useState } from "react";
import "./HeroSlider.css";

const HeroSlider = () => {
  const slides = [
    {
      image: "public\assets\img2.jpg",
      title: "Welcome to Our Website!",
      description: "Explore our amazing products and services.",
    },
    {
      image: "public\assets\img1.jpg",
      title: "Discover More",
      description: "Find the best deals for you.",
    },
    {
      image: "public\assets\slider5.jpg",
      title: "Join Our Community",
      description: "Be a part of our ever-growing family.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="hero-slider">
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a href="#cta" className="cta-button">Learn More</a>
            </div>
          </div>
        ))}
      </div>
      <button className="prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="next" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default HeroSlider;
