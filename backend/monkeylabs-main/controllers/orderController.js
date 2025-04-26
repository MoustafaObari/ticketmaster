const Orders = require('../models/Order');
const Ticket = require('../models/Ticket');

const getAllOrders = async (req, res) => {
    try {
        const venues = await Orders.find({}).populate('ticket');
        res.status(200).json(venues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching venues.' });
    }
};

const getAllOrdersByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const venues = await Orders.find({ user_id: userId }).populate('ticket');
        res.status(200).json(venues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching venues.' });
    }
};

const getOrderById = async (req, res) => {
    const ordersId = req.params.id;

    try {
        const orders = await Orders.findById(ordersId);

        if (!orders) {
            return res.status(404).json({ message: 'Orders not found.' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
};

const createOrder = async (req, res) => {
    const body = req.body || {};

    const { userId, ticketId, cardHolder, cardNumber, cvv, expiryDate } = body;

    console.log(userId, ticketId, cardHolder, cardNumber, cvv, expiryDate)

    if (!userId || !ticketId || !cardHolder || !cardNumber || !cvv || !expiryDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const ticket = await Ticket.findOneAndUpdate({ _id: ticketId, available: true }, { available: false }, { new: true });

        console.log("ticket found", ticketId, ticket)
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or already booked.' });
        }

        const newOrders = new Orders({
            user_id: userId,
            order_date: new Date(),
            ticket: ticket._id,
            cardHolder,
            cardNumber: '**** **** **** ' + cardNumber.slice(-4),
            cvv,
            expiryDate
        });

        const savedOrders = await newOrders.save();

        res.status(201).json(savedOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding orders.' });
    }
};

const updateOrder = async (req, res) => {
    const ordersId = req.params.id;

    try {
        const updatedOrders = await Orders.findByIdAndUpdate(ordersId, req.body, { new: true, runValidators: true });

        if (!updatedOrders) {
            return res.status(404).json({ message: 'Orders not found.' });
        }

        res.status(200).json(updatedOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while updating orders.' });
    }
};

const deleteAllOrders = async (req, res) => {
    try {
        const orders = await Orders.deleteMany({});
        res.status(200).json({ message: 'All orders successfully deleted.', deletedOrders: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting orders.' });
    }
};

module.exports = {
    getAllOrders,
    getAllOrdersByUserId,
    getOrderById,
    createOrder,
    updateOrder,
    deleteAllOrders
}