const Tickets = require('../models/Ticket');

const getAllTickets = async (req, res) => {
  try {
      const venues = await Tickets.find({});
      res.status(200).json(venues);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching venues.' });
  }
};

const getTicketById = async (req, res) => {
  const ticketsId = req.params.id;

    try {
        const tickets = await Tickets.findById(ticketsId);
        
        if (!tickets) {
            return res.status(404).json({ message: 'Tickets not found.' });
        }

        res.status(200).json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching tickets.' });
    }
};

const getAllTicketsByEventId = async (req, res) => {
    const ticketsId = req.params.id;
    
        try {
            const tickets = await Tickets.find({ event_id: ticketsId, available: true });
            
            if (!tickets) {
                return res.status(404).json({ message: 'Tickets not found.' });
            }
    
            res.status(200).json(tickets);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error while fetching tickets.' });
        }
};

const createTicket = async (req, res) => {
    const { event_id, price, available, seat_number } = req.body;

    if (!event_id || !price || !available || !seat_number) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newTickets = new Tickets({
          event_id,
          price,
          available,
          seat_number,
        });

        const savedTickets = await newTickets.save();

        res.status(201).json(savedTickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding tickets.' });
    }
};

const updateTicket = async (req, res) => {
  const ticketsId = req.params.id;

  try {
      const updatedTickets = await Tickets.findByIdAndUpdate(ticketsId, req.body, { new: true, runValidators: true });
      
      if (!updatedTickets) {
          return res.status(404).json({ message: 'Tickets not found.' });
      }

      res.status(200).json(updatedTickets);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating tickets.' });
  }
};

const deleteAllTickets = async (req, res) => {
  try {
      const tickets = await Tickets.deleteMany({});
      res.status(200).json({ message: 'All tickets successfully deleted.', deletedTickets: tickets });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting tickets.' });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  getAllTicketsByEventId,
  createTicket,
  updateTicket,
  deleteAllTickets
}