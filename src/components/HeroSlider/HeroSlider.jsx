import React, { useState } from "react";
import "./HeroSlider.css";

const HeroSlider = () => {
  const slides = [
    {
      image: "https://via.placeholder.com/1920x1080/FF5733/FFFFFF?text=Slide+1",
      title: "Welcome to Our Website!",
      description: "Explore our amazing products and services.",
    },
    {
      image: "https://via.placeholder.com/1920x1080/33A1FF/FFFFFF?text=Slide+2",
      title: "Discover More",
      description: "Find the best deals for you.",
    },
    {
      image: "https://via.placeholder.com/1920x1080/85FF33/FFFFFF?text=Slide+3",
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
