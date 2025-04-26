const Venues = require('../models/Venue');

const getAllVenues = async (req, res) => {
  try {
      const venues = await Venues.find({});
      res.status(200).json(venues);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching venues.' });
  }
};

const getVenueById = async (req, res) => {
  const venuesId = req.params.id;

    try {
        const venues = await Venues.findById(venuesId);
        
        if (!venues) {
            return res.status(404).json({ message: 'Venues not found.' });
        }

        res.status(200).json(venues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching venues.' });
    }
};

const createVenue = async (req, res) => {
    const { venue_name, location } = req.body;

    if (!venue_name || !location) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newVenues = new Venues({
          venue_name,
          location,
        });

        const savedVenues = await newVenues.save();

        res.status(201).json(savedVenues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding venues.' });
    }
};

const updateVenue = async (req, res) => {
  const venuesId = req.params.id;

  try {
      const updatedVenues = await Venues.findByIdAndUpdate(venuesId, req.body, { new: true, runValidators: true });
      
      if (!updatedVenues) {
          return res.status(404).json({ message: 'Venues not found.' });
      }

      res.status(200).json(updatedVenues);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating venues.' });
  }
};

const deleteAllVenues = async (req, res) => {
  try {
      const venues = await Venues.deleteMany({});
      res.status(200).json({ message: 'All venues successfully deleted.', deletedVenues: venues });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting venues.' });
  }
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteAllVenues
}