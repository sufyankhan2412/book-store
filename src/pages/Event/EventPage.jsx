import React, { useEffect, useState } from "react";
import './EventPage.css';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
const EventPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const eventsData = [
    {
      id: 1,
      title: "TOP WRITING JOBS TODAY ",
      date: "Jul 22, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Manhattan Club, New York, NY, USA",
      price: "$420",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiWgJ7-5x9S7vkNwGROyTI_smTK2ufZ4e3gw&s",
    },
    {
      id: 2,
      title: "VALANTINE DAY SPECIAL ",
      date: "14 feb , 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Comsats university,Pakistan,Islamabad",
      price: "$500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqmyKa09RMSQWAq1FhHY--HKhDiCtRxe-Cw&s/150",
    },
    {
      id: 3,
      title: "WRITING MASTERCLASS",
      date: "Nov 18, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Manhattan Club, New York, NY, USA",
      price: "$400",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvJ1jjKWVllurYA4Vr6F2K10J1q7Op4cePg&s/150",
    },
    {
      id: 4,
      title: "BOOK CLUB ",
      date: "Aug 4, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Manhattan Club,London, NY, UK",
      price: "$300",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_Y2aIpE73FJdRni_Ew00sdm3yKJb9nIctw&s/150",
    },
    {
      id: 5,
      title: "WRITER'S GUIDE 2022",
      date: "Aug 19, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Manhattan Club, New York, NY, USA",
      price: "$300",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHckl6pjchKGmZNdYUcCT5gEa5eCDHtprbQ&s/150",
    },
    {
      id: 6,
      title: "BOOK SPECIAL ",
      date: "25 feb , 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Comsats university,Pakistan,Islamabad",
      price: "$500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMv4hXWThMqUuXmIUigGPqbEeHG8O4oS9lQ&s/150",
    },
    {
      id: 7,
      title: "SPECIAL DAY  ",
      date: "23 jun , 2028",
      time: "9:00 AM - 6:00 PM",
      location: "PARK,Pakistan,Islamabad",
      price: "$500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxjmpjEQk2Fx8jSIVF1epa_glVabWDbIu9A&s/150",
    },
    {
      id: 8,
      title: "HOLIDAYS ",
      date: "24 April , 2029",
      time: "9:00 AM - 6:00 PM",
      location: "Sea view,Pakistan,Karachi",
      price: "$500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQECAAO8jQfYmSzwj6VqOvJgQvIE2SiHdiA9w&s/150",
    },
  ];

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Shrink Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    const slides = document.querySelectorAll('.hero-slide');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentSlide = 0;

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

    // Slider functionality
    const showSlide = (index) => {
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      slides[index].classList.add('active');
    };

    const nextSlide = () => {
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0; // Loop back to the first slide
      }
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1; // Loop to the last slide
      }
      showSlide(currentSlide);
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);

    if (leftBtn && rightBtn) {
      leftBtn.addEventListener('click', prevSlide);
      rightBtn.addEventListener('click', nextSlide);
    }

    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });

    return () => {
      // Cleanup event listeners and interval
      clearInterval(autoSlideInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>

      <Navbar />
      <HeroSlider />
      
      {/* Upcoming Events Section */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for events"
            className="search-box"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Find Events</button>
        </div>

        {/* Event List */}
        <div className="event-container">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  <div>{event.date.split(" ")[1]}</div>
                  <div style={{ fontSize: "28px" }}>{event.date.split(" ")[0]}</div>
                </div>
                <div className="event-info">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-location">{event.location}</p>
                  <p className="event-time">{event.time}</p>
                  <p className="event-price">{event.price}</p>
                </div>
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              No events found.
            </p>
          )}
        </div>
      </section>

      <Footer/>

    </div>
  );
};

export default EventPage;