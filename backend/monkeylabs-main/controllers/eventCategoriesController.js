const EventCategories = require('../models/EventCategory');

const getAllEventCategories = async (req, res) => {
  try {
      const venues = await EventCategories.find({});
      res.status(200).json(venues);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching venues.' });
  }
};

const getEventCategoryById = async (req, res) => {
  const eventCategoriesId = req.params.id;

    try {
        const eventCategories = await EventCategories.findById(eventCategoriesId);
        
        if (!eventCategories) {
            return res.status(404).json({ message: 'EventCategories not found.' });
        }

        res.status(200).json(eventCategories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching eventCategories.' });
    }
};

const createEventCategory = async (req, res) => {
    const { event_id, category_id } = req.body;

    if (!event_id || !category_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newEventCategories = new EventCategories({
          event_id,
          category_id
        });

        const savedEventCategories = await newEventCategories.save();

        res.status(201).json(savedEventCategories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding eventCategories.' });
    }
};

const updateEventCategory = async (req, res) => {
  const eventCategoriesId = req.params.id;

  try {
      const updatedEventCategories = await EventCategories.findByIdAndUpdate(eventCategoriesId, req.body, { new: true, runValidators: true });
      
      if (!updatedEventCategories) {
          return res.status(404).json({ message: 'EventCategories not found.' });
      }

      res.status(200).json(updatedEventCategories);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating eventCategories.' });
  }
};

const deleteAllEventCategories = async (req, res) => {
  try {
      const eventCategories = await EventCategories.deleteMany({});
      res.status(200).json({ message: 'All eventCategories successfully deleted.', deletedEventCategories: eventCategories });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting eventCategories.' });
  }
};

module.exports = {
  getAllEventCategories,
  getEventCategoryById,
  createEventCategory,
  updateEventCategory,
  deleteAllEventCategories
}