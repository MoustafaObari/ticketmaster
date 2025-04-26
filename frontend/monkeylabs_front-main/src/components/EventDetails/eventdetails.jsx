import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";
import NavBar from "../partials/header";
import PaymentModal from "../PaymentModal/paymentmodal";

function EventDetailsForm() {
  const { eventId } = useParams();

  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    event_description: "",
    event_image: "",
    event_date: "",
    venue: {},
    category: {},
    _id: "",
  });

  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedTicketId, setSelectedTicketId] = useState(null); // New state for selected ticket ID

  // Function to handle ticket click
  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId); // Set the selected ticket ID
    setIsModalOpen(!isModalOpen); // Open the modal
  };

  useEffect(() => {
    // Fetch event details
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });

    // Fetch tickets for the event
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/tickets/event/${eventId}`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, [eventId]);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1 className="card-title mb-4">Event Details</h1>
        <div className="card">
          <div className="card-body">
            <img
              src={eventDetails.event_image}
              alt={eventDetails.event_name}
              className="card-img-top"
              style={{ 
                  maxHeight: '600px', 
                  objectFit: 'cover',
                  width: '100%',
                  marginBottom: '10px'
              }}  
            />
            <p className="card-text">
              <strong>Event Name:</strong> {eventDetails.event_name}
            </p>
            <p className="card-text">
              <strong>Event Description:</strong>{" "}
              {eventDetails.event_description}
            </p>
            <p className="card-text">
              <strong>Event Date:</strong> {eventDetails.event_date}
            </p>
            <p className="card-text">
              <strong>Venue Details:</strong> {eventDetails?.venue?.venue_name},{" "}
              {eventDetails?.venue?.location}
            </p>
            <p className="card-text">
              <span className="badge bg-primary">{eventDetails?.category.category_name}</span>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h6 className="mb-3">Available Tickets</h6>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card mb-2 card-hover"
              onClick={() => handleTicketClick(ticket._id)}
            >
              <div className="card-body">
                <p className="card-text">
                  <strong>Seat Number:</strong> {ticket.seat_number}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${ticket.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={handleTicketClick}
          ticketId={selectedTicketId}
        />
      )}{" "}
      {/* Render modal based on state */}
    </div>
  );
}

export default EventDetailsForm;
