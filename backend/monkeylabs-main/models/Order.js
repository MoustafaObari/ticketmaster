const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    order_date: Date,
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    },
    cardHolder: String,
    cardNumber: String,
    cvv: String,
    expiryDate: String
});

module.exports = mongoose.model('Orders', ordersSchema);