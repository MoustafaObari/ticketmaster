const Events = require('../models/Event');

const getAllEvents = async (req, res) => {
  try {
      const events = await Events.find({}).populate('venue').populate('category');
      res.status(200).json(events);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching events.' });
  }
};

const getEventById = async (req, res) => {
  const eventsId = req.params.id;

    try {
        const events = await Events.findById(eventsId).populate('venue').populate('category');
        console.log(events)
        if (!events) {
            return res.status(404).json({ message: 'Events not found.' });
        }

        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching events.' });
    }
};

const createEvent = async (req, res) => {
    const { event_name, venue_id, event_date, event_description, event_image, category_id } = req.body;

    if (!event_name || !venue_id || !event_date || !event_description || !event_image || !category_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newEvents = new Events({
            event_name,
            venue: venue_id,
            event_date,
            event_description,
            event_image,
            category: category_id
        });

        const savedEvents = await newEvents.save();

        res.status(201).json(savedEvents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding events.' });
    }
};

const updateEvent = async (req, res) => {
  const eventsId = req.params.id;

  try {
      const updatedEvents = await Events.findByIdAndUpdate(eventsId, req.body, { new: true, runValidators: true });
      
      if (!updatedEvents) {
          return res.status(404).json({ message: 'Events not found.' });
      }

      res.status(200).json(updatedEvents);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating events.' });
  }
};

const deleteAllEvents = async (req, res) => {
  try {
      const events = await Events.deleteMany({});
      res.status(200).json({ message: 'All events successfully deleted.', deletedEvents: events });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting events.' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteAllEvents
}