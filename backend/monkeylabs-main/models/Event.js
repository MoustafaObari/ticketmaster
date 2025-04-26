const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    event_name: String,
    event_date: String,
    event_description: String,
    event_image: String,
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venues',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },

});

module.exports = mongoose.model('Events', eventsSchema);