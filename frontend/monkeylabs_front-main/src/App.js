import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp/signup';
import LogIn from './components/LogIn/login';
import Profile from './components/Profile/profile';
import Events from './components/Events/event';
import EventDetails from './components/EventDetails/eventdetails';
import Orders from './components/Orders/orders';

const Home = () => (
  <div className="container mt-5">
    <h2>Welcome to our App!</h2>
    <p>Choose an action:</p>
    <Link to="/signup" className="d-block">
      <button className="btn btn-primary">Sign Up</button>
    </Link>
    <Link to="/login" className="d-block mt-2">
      <button className="btn btn-secondary">Login</button>
    </Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Events />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/orders" element={<Orders />} />
        {/* <Route path="/events" element={<Events />} /> */}
        {/* <Route path="/event-details" element={<EventDetails />} /> */}
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        {/* <Route path="/profile/:userId" element={<Profile />} /> */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;