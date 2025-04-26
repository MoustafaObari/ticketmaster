import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';
import "./event.css";
import NavBar from "../partials/header";

function EventForm() {
    const [eventsByCategory, setEventsByCategory] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                const events = response.data;  // Assuming response.data is an array of events

                // Group events by category
                const groupedEvents = events.reduce((acc, event) => {
                    const category = event.category.category_name;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(event);
                    return acc;
                }, {});

                setEventsByCategory(groupedEvents);

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const getRandomElements = (arr, n) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    };
    
    const featuredEvents = Object.values(eventsByCategory).flatMap(
        events => getRandomElements(events, 3)
    ).filter(event => event);

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                {/* Carousel */}
                <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {featuredEvents.map((event, index) => (
                            <div key={event._id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3000">
                                <Link to={`/event-details/${event._id}`} className="text-decoration-none">
                                    <img 
                                        className="d-block w-100"
                                        src={event.event_image} 
                                        alt={event.event_name} 
                                        style={{ 
                                            objectFit: 'cover', 
                                            maxHeight: '600px'
                                        }} 
                                    />
                                </Link>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{event.event_name}</h5>
                                    <p>{event.venue.venue_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a className="carousel-control-prev" href="#eventCarousel" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next" href="#eventCarousel" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>

                {/* Events by Category */}
                <h1 className="mb-3 mt-5">Events</h1>
                {Object.keys(eventsByCategory).map(category => (
                    <div key={category}>
                        <h2 className="mt-4">{category}</h2>
                        <div className="row">
                            {eventsByCategory[category].map(event => (
                                <div key={event._id} className="col-md-4 mb-3">
                                    <Link to={`/event-details/${event._id}`} className="text-decoration-none">
                                        <div className="card h-100 card-hover">
                                            <div className="card-body">
                                                <img 
                                                    src={event.event_image} 
                                                    alt={event.event_name} 
                                                    className="card-img-top" 
                                                    style={{ 
                                                        maxHeight: '200px', 
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        marginBottom: '10px'
                                                    }}  
                                                />
                                                <h5 className="card-title">{event.event_name}</h5>
                                                <p className="card-text">Date: {event.event_date}</p>
                                                <p className='card-text'>Venue Details: {event.venue.venue_name}, {event.venue.location}</p>
                                                <p className='card-text'>
                                                    <span className="badge bg-primary">{event.category.category_name}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventForm;
