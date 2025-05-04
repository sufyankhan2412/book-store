import React, { useEffect, useState } from "react";
import './EventPage.css';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HeaderBanner from '../../components/HeaderBanner/HeaderBanner';

const EventPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const eventsData = [
    {
      id: 1,
      title: "TOP WRITING JOBS TODAY",
      date: "Jul 22, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Manhattan Club, New York, NY, USA",
      price: "$420",
      image: "https://via.placeholder.com/150?text=Event+1",
    },
    {
      id: 2,
      title: "VALENTINE'S DAY SPECIAL",
      date: "Feb 14, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Comsats University, Islamabad, Pakistan",
      price: "$500",
      image: "https://via.placeholder.com/150?text=Event+2",
    },
    {
      id: 3,
      title: "WRITING MASTERCLASS",
      date: "Nov 18, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Manhattan Club, New York, NY, USA",
      price: "$400",
      image: "https://via.placeholder.com/150?text=Event+3",
    },
    {
      id: 4,
      title: "BOOK CLUB",
      date: "Aug 04, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Manhattan Club, London, UK",
      price: "$300",
      image: "https://via.placeholder.com/150?text=Event+4",
    },
    {
      id: 5,
      title: "WRITER'S GUIDE 2022",
      date: "Aug 19, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Manhattan Club, New York, NY, USA",
      price: "$300",
      image: "https://via.placeholder.com/150?text=Event+5",
    },
    {
      id: 6,
      title: "BOOK SPECIAL",
      date: "Feb 25, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Comsats University, Islamabad, Pakistan",
      price: "$500",
      image: "https://via.placeholder.com/150?text=Event+6",
    },
    {
      id: 7,
      title: "SPECIAL DAY",
      date: "Jun 23, 2028",
      time: "9:00 AM - 6:00 PM",
      location: "Park, Islamabad, Pakistan",
      price: "$500",
      image: "https://via.placeholder.com/150?text=Event+7",
    },
    {
      id: 8,
      title: "HOLIDAYS",
      date: "Apr 24, 2029",
      time: "9:00 AM - 6:00 PM",
      location: "Sea View, Karachi, Pakistan",
      price: "$500",
      image: "https://via.placeholder.com/150?text=Event+8",
    },
  ];

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('shrink');
      } else {
        navbar?.classList.remove('shrink');
      }

      if (scrollToTopBtn) {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navbar />
      <HeaderBanner title="EVENT" />

      <section className="events-section">
        <h2>Upcoming Events</h2>

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

        <div className="event-container">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const [month, day] = event.date.split(" ");
              return (
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <div>{month}</div>
                    <div className="event-day">{day.replace(",", "")}</div>
                  </div>
                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <p>{event.location}</p>
                    <p>{event.time}</p>
                    <p>{event.price}</p>
                  </div>
                  <img src={event.image} alt={event.title} />
                </div>
              );
            })
          ) : (
            <p className="no-results">No events found.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventPage;
